import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutsComponent} from "./core/layouts/layouts.component";
import {LoginComponent} from "./features/auth/login/login.component";
import {RegisterComponent} from "./features/auth/register/register.component";
import {ForgotPasswordComponent} from "./features/auth/forgot-password/forgot-password.component";

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:'',
    pathMatch:'full',
    component:LayoutsComponent
  },

  {
    path: 'auth',
    component:LayoutsComponent,
    loadChildren: () => import('./features/auth/auth.module').then( m => m.AuthModule)
  },

  {
    path: 'login',
    component:LoginComponent,
  },

  {
    path: 'register',
    component:RegisterComponent,
  },

  {
    path: 'forgot-password',
    component:ForgotPasswordComponent,
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

