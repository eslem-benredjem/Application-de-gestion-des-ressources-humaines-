import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Update } from 'src/app/models/update';
import { User } from 'src/app/models/user';
import { AuthService } from '../auth/auth.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8081/projet/user';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    
    // Vérifier si le token est présent
    if (!token) {
      console.warn("Aucun token trouvé !");
      return new HttpHeaders();
    }

    // Vérifier si le token est expiré
    try {
      const decoded: any = jwtDecode(token);
      if (Date.now() >= decoded.exp * 1000) {
        console.warn("Token expiré !");
        this.auth.logout();
        return new HttpHeaders();
      }
    } catch (error) {
      console.error("Erreur lors du décodage du token", error);
      return new HttpHeaders();
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/ajouterEmploye`, user, { headers: this.getAuthHeaders() });
  }

  getListUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listeUsers`, { headers: this.getAuthHeaders() });
  }

  getUserById(id: number): Observable<Update> {
    return this.http.get<Update>(`${this.apiUrl}/user/${id}`, { headers: this.getAuthHeaders() });
  }

  updateUser(id: number, user: Update): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/modifierProfile/${id}`, user, { headers: this.getAuthHeaders() });
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteById/${id}`, { headers: this.getAuthHeaders() });
  }

  getSupervisors(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/supervisors`, { headers: this.getAuthHeaders() });
  }

  updateProfile(user: Update): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/modifierProfile/${user.id}`, user, { headers: this.getAuthHeaders() });
  }

  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`, { headers: this.getAuthHeaders() });
  }

  getGroups(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/groups`, { headers: this.getAuthHeaders() });
  }

  getEmployeesForSupervisor(): Observable<User[]> {
    const supervisorId = this.auth.getUserIdFromToken();
    return this.http.get<User[]>(`${this.apiUrl}/listesuperviseur/${supervisorId}`, {
      headers: this.getAuthHeaders()
    });
  }

  getTotalEmployees(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/totalEmployees`, { headers: this.getAuthHeaders() });
  }
}
