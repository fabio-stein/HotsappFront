import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { AuthService } from './auth-service.service';
import { NbAuthService } from '@nebular/auth';
import { auth } from 'firebase';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: NbAuthService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.auth.isAuthenticatedOrRefresh().toPromise();
    console.log('AUTHENTICATED: ' + isAuthenticated);
    if (!isAuthenticated) {
      this.router.navigate(['auth/login']);
    }
    return isAuthenticated;
  }

}
