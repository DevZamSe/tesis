import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from '../shared/material/material.module';
import { ModalForgetPasswordComponent } from './components/modal-forget-password/modal-forget-password.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginComponent, ModalForgetPasswordComponent],
  imports: [CommonModule, AuthRoutingModule, MaterialModule,FormsModule,ReactiveFormsModule ],
})
export class AuthModule {}
