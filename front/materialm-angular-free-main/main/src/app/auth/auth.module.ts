import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { AuthRoutingModule } from './auth.routing';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        AuthRoutingModule
  ]
})
export class AuthModule { }
