import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';

import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ForgotComponent } from './forgot/forgot.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { SessionRoutes } from './session.routing';
import { SignupComponent } from './signup/signup.component';
import { LoginService } from '../services/login.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SessionRoutes),
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [LoginService],
  declarations: [
    NotFoundComponent,
    ErrorComponent,
    ForgotComponent,
    LockscreenComponent,
    SignupComponent
  ]
})
export class SessionModule {}
