import { Routes } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent } from './core';
import { SigninComponent } from './signin/signin.component';
import { RegistroFinalComponent } from './registro-final/registro-final.component';


export const AppRoutes: Routes = [ 
   {
  path: 'admin',
  component: AdminLayoutComponent,
  children: [{
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
  }]
}, 
{
  path: '',
  component : SigninComponent
},
{
  path: 'register/:id',
  component : RegistroFinalComponent
},
  {
  path: '**',
  redirectTo: 'session/404'
}];
