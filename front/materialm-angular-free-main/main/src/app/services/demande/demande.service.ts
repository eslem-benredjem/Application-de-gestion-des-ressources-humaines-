import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LeaveRequest } from '../../models/LeaveRequest ';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private apiUrl = 'http://localhost:8081/projet/leave-requests'; 

  constructor(private http: HttpClient, private authService: AuthService) {}


  createLeaveRequest(leaveRequest: any): Observable<any> {
    const headers = this.authService.getAuthHeaders(); 
    return this.http.post(`${this.apiUrl}/demandeConge`, leaveRequest,{headers});
  }
  

  getLeaveRequestsByUser(userId: number): Observable<any[]> {
    const headers = this.authService.getAuthHeaders(); 
    return this.http.get<LeaveRequest[]>(`${this.apiUrl}/user/${userId}`,{headers});
  }

  deleteLeaveRequest(leaveId: number): Observable<any> {
    const headers = this.authService.getAuthHeaders(); 
    return this.http.delete(`${this.apiUrl}/supprimer/${leaveId}`,{headers});
  }

  updateLeaveRequest(leaveRequestId: number, leaveRequest: LeaveRequest): Observable<LeaveRequest> {
    const headers = this.authService.getAuthHeaders(); 
    return this.http.put<LeaveRequest>(`${this.apiUrl}/${leaveRequestId}`, leaveRequest,{headers});
  }

  getLeaveRequestsAdmin(): Observable<any[]> {
   const headers = this.authService.getAuthHeaders(); 
    return this.http.get<any[]>('http://localhost:8081/projet/leave-requests/admin',{headers});
  }

  accepter(id: number): Observable<any> {
    const headers = this.authService.getAuthHeaders(); 
    return this.http.put(`${this.apiUrl}/accept/${id}`, {},{headers});
  }
  
  refuser(id: number): Observable<any> {
    const headers = this.authService.getAuthHeaders(); 
    return this.http.put(`${this.apiUrl}/reject/${id}`, {},{headers});
  }


}
