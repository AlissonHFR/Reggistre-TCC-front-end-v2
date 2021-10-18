import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PasswordRecoveryComponent } from 'src/app/pages/password-recovery/password-recovery.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
    // NgbModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    PasswordRecoveryComponent,
  ]
})
export class AuthLayoutModule { }
