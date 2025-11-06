import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupList } from '../../models/groupList';
import { Group } from 'src/app/models/Groupe';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private apiUrl = 'http://localhost:8081/projet/groups';

  constructor(private http: HttpClient, private Auth: AuthService) {}

  getListGroups(): Observable<GroupList[]> {
    const headers = this.Auth.getAuthHeaders();
    return this.http.get<GroupList[]>(`${this.apiUrl}/listeG`, {headers});
  }

  getGroupById(id: number): Observable<GroupList> {
    const headers = this.Auth.getAuthHeaders();
    console.log('Headers envoyés:', headers);
    return this.http.get<GroupList>(`${this.apiUrl}/${id}`, {headers});
  }

  addGroup(group: Group): Observable<any> {
    const headers = this.Auth.getAuthHeaders();
    return this.http.post<any>(`${this.apiUrl}/ajouterGroup`, group, {headers});
  }

  updateGroup(id: number, group: any): Observable<any> {
    const headers = this.Auth.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${id}`, group, {headers});
  }

  deleteGroup(id: number): Observable<string> {
    const headers = this.Auth.getAuthHeaders();
    return this.http.delete<string>(`${this.apiUrl}/${id}`, {headers});
  }

  getAllGroups(): Observable<any[]> {
    const headers = this.Auth.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/names`, {headers});
  }


}
