import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthSocialLink, NbAuthService, getDeepFromObject } from '@nebular/auth';



@Component({
  selector: 'app-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  showMessages: any = {};

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  socialLinks: NbAuthSocialLink[] = [];
  validation = {};

  constructor(protected auth: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected config = {},
    protected router: Router) {

    this.showMessages = this.getConfigValue('forms.register.showMessages');
    this.socialLinks = this.getConfigValue('forms.register.socialLinks');

    this.validation = this.getConfigValue('forms.validation');

    auth.isAuthenticatedOrRefresh().toPromise().then(e => {
      if (e) {
        this.redirectToDashboard();
      }
    })
  }

  register(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.auth.register("firebase", { email: this.user.email, password: this.user.password, fullName: this.user.fullName })
      .subscribe(e => {
        this.submitted = false;
        this.messages = [];
        if (e.isSuccess()) {
          this.redirectToDashboard()
        } else {
          this.submitted = false;
          this.errors = e.getMessages();
        }
      })
  }
  /*
    loginSocial(name) {
      if (name === "google") {
        this.loginGoogle();
      } else if (name === "facebook") {
        this.loginFb();
      } else {
        console.warn("No login for " + name);
      }
    }
  
    loginGoogle() {
      this.auth.signInWithGoogle()
        .then((success) => {
          this.redirectToDashboard()
        })
        .catch((err) => {
          this.errors = [err];
        });
    }
  
    loginFb() {
      this.auth.signInWithFacebook()
        .then((success) => {
          this.redirectToDashboard()
        })
        .catch((err) => {
          this.errors = [err];
        });
    }*/

  redirectToDashboard() {
    console.log("Redirecting to dashboard");
    this.router.navigate(['/pages/dashboard']);
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }
}