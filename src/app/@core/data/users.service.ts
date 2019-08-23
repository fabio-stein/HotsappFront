
import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth-service.service';
import { NbAuthJWTToken } from '@nebular/auth';

@Injectable()
export class UserService {

  private user = {};

  constructor(private authService: AuthService) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload();
        }

      });
  }

  getUser(): Observable<any> {
    return observableOf(this.user);
  }
}
