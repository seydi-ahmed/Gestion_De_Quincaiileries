import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, Role } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>('/api/auth/signin', { email, password })
      .pipe(map(response => {
        if (response && response.accessToken) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      }));
  }

  register(user: User) {
    return this.http.post<any>('/api/auth/signup', user)
      .pipe(map(response => {
        if (response && response.accessToken) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null as any);
  }

  isSuperAdmin(): boolean {
    return this.currentUserValue && this.currentUserValue.role === Role.SUPER_ADMIN;
  }

  isOwner(): boolean {
    return this.currentUserValue && this.currentUserValue.role === Role.OWNER;
  }

  isManager(): boolean {
    return this.currentUserValue && this.currentUserValue.role === Role.MANAGER;
  }
}