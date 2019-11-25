import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthSocialLink, NbAuthService, getDeepFromObject } from '@nebular/auth';
import { FirebaseAuthOption } from '../../strategy/firebase-strategy';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {

  redirectDelay: number = 0;

  errors: string[] = [];
  messages: string[] = [];
  user: any = { rememberMe: true };

  showMessages: any = {};
  submitted: boolean = false;
  socialLinks: NbAuthSocialLink[] = [];

  validation: any = {};

  constructor(protected auth: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected config = {}, protected router: Router) {
    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');

    this.validation = this.getConfigValue('forms.validation');

    auth.isAuthenticatedOrRefresh().toPromise().then(e => {
      if (e) {
        this.redirectToDashboard();
      }
    });
  }

  login() {
    this.errors = this.messages = [];
    this.submitted = true;
    this.authProviderLogin('email', { email: this.user.email, password: this.user.password });
  }

  loginSocial(name) {
    this.authProviderLogin(name);
  }

  authProviderLogin(provider: string, data?: any) {
    const param: FirebaseAuthOption = {
      provider: provider,
      data: data,
    };
    this.submitted = true;
    this.auth.authenticate('firebase', param).subscribe(t => {
      this.submitted = false;
      if (t.isSuccess()) {
        this.redirectToDashboard();
      } else {
        this.errors = t.getMessages();
      }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }

  redirectToDashboard() {
    console.log('Redirecting to dashboard');
    this.router.navigate(['/pages/dashboard']);
  }
}
