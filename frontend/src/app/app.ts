import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth';
import { User, Role } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  title = 'Hardware Management System';
  currentUser: User;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isSuperAdmin(): boolean {
    return this.currentUser && this.currentUser.role === Role.SUPER_ADMIN;
  }

  isOwner(): boolean {
    return this.currentUser && this.currentUser.role === Role.OWNER;
  }

  isManager(): boolean {
    return this.currentUser && this.currentUser.role === Role.MANAGER;
  }
}