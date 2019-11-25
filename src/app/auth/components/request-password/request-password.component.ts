import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthService, getDeepFromObject } from '@nebular/auth';

@Component({
  selector: 'app-request-password',
  styleUrls: ['./request-password.component.scss'],
  templateUrl: './request-password.component.html',
})
export class RequestPasswordComponent {

  showMessages: any = {};

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  validation: any = {};

  constructor(protected auth: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected config = {},
    protected router: Router) {

    this.showMessages = this.getConfigValue('forms.requestPassword.showMessages');

    this.validation = this.getConfigValue('forms.validation');

    auth.isAuthenticatedOrRefresh().toPromise().then(e => {
      if (e) {
        this.redirectToDashboard();
      }
    });
  }

  requestPass() {

    this.errors = this.messages = [];
    this.submitted = true;
    this.auth.requestPassword('firebase', { email: this.user.email }).subscribe(
      (res) => {
        this.submitted = false;
        this.messages = res.getMessages();
        this.errors = res.getErrors();
      });
  }

  redirectToDashboard() {
    this.router.navigate(['/']);
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }
}
