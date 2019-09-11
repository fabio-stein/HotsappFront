import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthService, getDeepFromObject } from '@nebular/auth';

@Component({
  selector: 'app-reset-password',
  styleUrls: ['./reset-password.component.scss'],
  templateUrl: './reset-password.component.html',
})

export class ResetPasswordComponent {

  showMessages: any = {};

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  validation: any = {};

  code: string;

  constructor(protected auth: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected config = {},
    protected router: Router, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParams.subscribe(params => {
      this.code = params['oobCode'];
      console.log(this.code); // Print the parameter to the console.
    });

    this.showMessages = this.getConfigValue('forms.resetPassword.showMessages');

    this.validation = this.getConfigValue('forms.validation');

    auth.isAuthenticatedOrRefresh().toPromise().then(e => {
      if (e) {
        this.redirectToDashboard();
      }
    });
  }

  resetPass(): void {

    this.errors = this.messages = [];
    this.submitted = true;
    /*
        this.auth.confirmPasswordReset(this.code, this.user.password)
          .then((res: any) => {
            this.submitted = false;
            this.messages = [res];

            this.redirectToDashboard()
          })
          .catch((err) => {
            this.submitted = false;
            this.errors = [err];
          });*/
  }

  redirectToDashboard() {
    this.router.navigate(['/']);
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }
}
