import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//npm install @auth0/angular-jwt
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
//npm install jwt-decode
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private apiUrl = 'http://localhost:8081/projet';
  private userRoleSubject = new BehaviorSubject<string | null>(null); // Initialiser avec null


  constructor(private http: HttpClient, private router: Router) {}

  //enregistre le token JWT dans le stockage local (localStorage).
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

//récupère le token JWT stocké dans localStorage.
  getToken(): string | null {
    return localStorage.getItem('token');
  }

//décoder le token JWT.
  decodeToken(token: string): any {
    try {
      return this.jwtHelper.decodeToken(token);
    } catch (error) {
      console.error('Erreur de décodage du token:', error);
      return null;
    }
  }

  //génère les en-têtes HTTP nécessaires pour les requêtes sécurisées.
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  //obtenir le rôle de l'utilisateur.
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

  getRole(): string {
    const role = localStorage.getItem('userRole') ?? 'EMPLOYE';
    console.log("Rôle récupéré depuis localStorage :", role);
    return role;
  }
  
  //Envoie une requête POST au serveur avec les identifiants de connexion.
  //Vérifie si l’utilisateur est valide et récupère un token JWT

  login(credentials: { username: string; password: string }): Observable<any> {
    console.log("Token stocké après connexion:", localStorage.getItem('token'));
    return this.http.post(this.apiUrl, credentials).pipe(
      catchError(error => {
        console.error('Erreur de login:', error);
        return throwError('Identifiants incorrects ou problème avec le serveur');
      })
    );
  }


  //extraire l’ID de l'utilisateur depuis le token.
  getUserIdFromToken(): number {
    const token = this.getToken();
    if (!token) {
      console.error(" Aucun token trouvé !");
      return 0;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken && decodedToken.userId ? decodedToken.userId : 0;
    } catch (error) {
      console.error("Erreur de décodage du token :", error);
      return 0;
    }
  }


  //Supprime le token JWT du localStorage pour déconnecter l’utilisateur.
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);  
  }

}
