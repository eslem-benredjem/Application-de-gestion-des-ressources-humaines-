import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './authGuard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full' 
  },
  {
    path: 'auth',
    component: BlankComponent,
    children: [
      { path: 'login', component: LoginComponent }, 
      {
        path: 'authentication',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
      },
    ],
  },
  {
    path: 'dashboard',
    component: FullComponent,
    children: [
      { 
        path: '', 
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
        //canActivate: [AuthGuard],
      },

    ],
  },
];

// export const routes: Routes = [
//   {
//     path: '',
//     component: FullComponent,
//     children: [
//       { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//       { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
//       // More routes...
//     ],
//   },
//   {
//     path: 'auth',
//     component: BlankComponent,
//     children: [
//       { path: 'login', component: LoginComponent },
//       {
//         path: 'authentication',
//         loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
//       },
//     ],
//   },
  
//   { path: '**', redirectTo: 'authentication/error' },
// ];