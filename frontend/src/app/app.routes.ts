import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Products } from './components/products/products';
import { Stores } from './components/stores/stores';
import { AuthGuard } from './guards/auth-guard';
import { Role } from './models/user';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', component: Dashboard, canActivate: [AuthGuard] },
  { path: 'products', component: Products, canActivate: [AuthGuard] },
  { 
    path: 'stores', 
    component: Stores, 
    canActivate: [AuthGuard], 
    data: { roles: [Role.SUPER_ADMIN, Role.OWNER] } 
  },
  { path: '**', redirectTo: '' }
];