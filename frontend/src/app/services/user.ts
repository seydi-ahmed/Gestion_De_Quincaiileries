import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Role } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>('/api/users', user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`/api/users/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`/api/users/${id}`);
  }

  getUsersByRole(role: Role): Observable<User[]> {
    return this.http.get<User[]>(`/api/users/role/${role}`);
  }

  getManagersByOwnerId(ownerId: number): Observable<User[]> {
    return this.http.get<User[]>(`/api/users/owner/${ownerId}/managers`);
  }
}