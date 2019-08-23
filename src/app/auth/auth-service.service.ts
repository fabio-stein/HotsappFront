import { Injectable, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NbTokenService, NbAuthToken, decodeJwtPayload, NbAuthStrategy, NB_AUTH_STRATEGIES, nbAuthCreateToken, NbAuthSimpleToken, NbAuthJWTToken } from '@nebular/auth';

/**
 * @deprecated Service migrated to firebase-strategy
 */
@Injectable()
export class AuthService {
  public user: Observable<firebase.User>;
  public userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth,
    @Inject(NB_AUTH_STRATEGIES) protected strategies,
    private router: Router,
    private _firestore: AngularFirestore,
    private _http: HttpClient,
    private tokenService: NbTokenService) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
        }
        else {
          this.userDetails = null;
        }
      }
    );
  }

  register(email, password, fullName) {
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(
        (afUser: firebase.auth.UserCredential) => {
          // Update the profile in firebase auth
          afUser.user.updateProfile({
            displayName: fullName,
            photoURL: ""
          }).then(() => afUser.user.sendEmailVerification());
          // Create the user in firestore
          this._firestore.firestore.collection("users").doc(afUser.user.uid).set(
            {
              uid: afUser.user.uid
            }
          );
        });
  }

  requestPass(email) {
    return this._firebaseAuth.auth.sendPasswordResetEmail(email);
  }

  confirmPasswordReset(code, newPassword) { // param: oobCode=<code>
    return this._firebaseAuth.auth.confirmPasswordReset(code, newPassword);
  }

  /*verifyPasswordResetCode(code){
    return this._firebaseAuth.auth.verifyPasswordResetCode(code);
  }*/

  signInWithEmail(email, password) {
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }
  signInWithTwitter() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider()
    )
  }
  signInWithFacebook() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    )
  }
  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }
  logout() {
    this.tokenService.clear();
    this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/auth/login']));
  }

  loginWithIdToken(token: string): Promise<string> {
    environment.API_ENDPOINT
    let url = environment.API_ENDPOINT + "/api/auth/SignIn";

    return new Promise((resolve, reject) => {
      this._http.post<any>(url.toString(), { idToken: token }).toPromise().then(data => {
        let token = this.createToken(data.access_token);
        this.tokenService.set(token);
        resolve("OK");
      }).catch(err => reject(err))
    })
  }

  onTokenChange(): Observable<NbAuthToken> {
    return this.tokenService.tokenChange();
  }

  protected createToken(token: string): any {
    let jwt = new NbAuthJWTToken(token, "firebase");
    return jwt;
  }
}