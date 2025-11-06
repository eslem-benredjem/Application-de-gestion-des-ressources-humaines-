import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private jwtHelper = new JwtHelperService();
  private apiUrl = 'http://localhost:8081/projet/user/login'; 

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  constructor(private http: HttpClient, private router: Router ,private authService: AuthService) {}

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  decodeToken(token: string): any {
    try {
      return this.jwtHelper.decodeToken(token);
    } catch (error) {
      console.error('Erreur de décodage du token:', error);
      return null;
    }
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken?.role || null;
      } catch (error) {
        console.error('Erreur de décodage du token:', error);
        return null;
      }
    }
    return null;
  }

  getUserIdFromToken(): number {
    const token = this.getToken();
    if (!token) {
      console.error(" Aucun token trouvé !");
      return 0;
    }

    try {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      return decodedToken?.userId || 0;
    } catch (error) {
      console.error("Erreur de décodage du token :", error);
      return 0;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  login(): void {
    if (this.loginForm.valid) {
      this.http.post<{ token: string }>(this.apiUrl, this.loginForm.value).pipe(
        catchError(error => {
    
          console.error('Erreur de login:', error);
          return throwError('Identifiants incorrects ou problème avec le serveur');
        })
      ).subscribe(response => {
        if (response.token) {
          this.saveToken(response.token);
          this.router.navigate(['/dashboard']); 
        }
      });
    }
  }
  
}
