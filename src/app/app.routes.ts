import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'api',
    loadComponent: () => import('./dashboard/dashboard.component'),
    children: [
      { 
        path: 'login', 
        title: 'Iniciar sesión', 
        loadComponent: () => import('./dashboard/pages/login/login.component')
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }, 
  { path: '', redirectTo: '/api', pathMatch: 'full' }
];
