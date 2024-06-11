import { Routes } from '@angular/router';
import { authGuard } from './core/security/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.component'),
    children: [
      { path: '', redirectTo: 'api-cat/login', pathMatch: 'full' },
      { path: 'api-cat/login', title: 'Iniciar sesión', loadComponent: () => import('./dashboard/pages/login/login.component') },
      { path: 'api-cat/register', title: 'Crear cuenta', loadComponent: () => import('./dashboard/pages/register/register.component') },
      { path: 'api-cat/home', title: 'Bienvenido', loadComponent: () => import('./dashboard/pages/home/home.component'), canActivate: [authGuard] },
    ]
  }, 
  { path: '**', redirectTo: 'api-cat' }
];