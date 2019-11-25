import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RequestPasswordComponent } from './components/request-password/request-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthService } from './auth-service.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../@theme/theme.module';
import { NbCheckboxModule, NbAlertModule, NbIconModule, NbInputModule, NbButtonModule, NbCardModule, NbLayoutModule } from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth';
import { NbExtAuthComponent } from './components/auth.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RequestPasswordComponent,
    ResetPasswordComponent,
    NbExtAuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    AuthRoutingModule,
    NbCheckboxModule,
    NbAuthModule,
    NbAlertModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    NbLayoutModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    RequestPasswordComponent,
    ResetPasswordComponent,
    NbExtAuthComponent
  ],
  providers: [
    AngularFireAuth,
    AuthService,
  ],
})
export class AuthModule { }
