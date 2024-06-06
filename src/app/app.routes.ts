import { Routes } from '@angular/router';
import { authGuard } from './core/security/guards/auth.guard';

// export const routes: Routes = [ 
//   { path: 'api', component: HomeComponent, canActivate: [authGuard] },
//   { path: 'api/login', component: LoginComponent },
//   { path: '**', redirectTo: '/api/login', pathMatch: 'full' }
// ];

export const routes: Routes = [
  {
    path: 'cat-api',
    loadComponent: () => import('./dashboard/dashboard.component'),
    children: [
      { path: 'login', title: 'Iniciar sesión', loadComponent: () => import('./dashboard/pages/login/login.component') },
      { path: 'home', title: 'Home', loadComponent: () => import('./dashboard/pages/home/home.component') },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  }, 
  { path: '', redirectTo: 'cat-api', pathMatch: 'full' }
];
