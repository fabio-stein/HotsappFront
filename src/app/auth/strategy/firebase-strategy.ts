import { Injectable, Inject } from '@angular/core';
import * as firebase from 'firebase/app';

import { Observable, of as observableOf, Subscriber, observable, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NbAuthStrategy, NbAuthStrategyClass, NbAuthResult, NbAuthJWTToken, NbAuthStrategyOptions, NbTokenService } from '@nebular/auth';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../../../environments/environment';
import { AngularFirestore } from 'angularfire2/firestore';
import { NbToastrService } from '@nebular/theme';



export class FirebaseAuthStrategyOptions extends NbAuthStrategyOptions {
    name = 'firebase';
    token = {
        class: NbAuthJWTToken,
    };
    checkEmail = true;
}

export class FirebaseAuthOption {
    provider: string;
    data?: any;
}

@Injectable()
export class FirebaseAuthStrategy extends NbAuthStrategy {
    public user: Observable<firebase.User>;
    public userDetails: firebase.User = null;

    constructor(protected http: HttpClient,
        private route: ActivatedRoute,
        private _firebaseAuth: AngularFireAuth,
        private _firestore: AngularFirestore,
        private _http: HttpClient,
        private _toastr: NbToastrService) {
        super()
        this.user = _firebaseAuth.authState;
    }

    protected defaultOptions: FirebaseAuthStrategyOptions = new FirebaseAuthStrategyOptions();

    static setup(options: FirebaseAuthStrategyOptions): [NbAuthStrategyClass, FirebaseAuthStrategyOptions] {
        return [FirebaseAuthStrategy, options];
    }

    authenticate(options?: FirebaseAuthOption): Observable<NbAuthResult> {
        return new Observable<NbAuthResult>(observer => {
            this.authenticateAsync(options).then(e => {
                observer.next(e);
            }).catch(err => {
                observer.next(this.errorResponse(err));
            })
        });
    }

    async authenticateAsync(options?: FirebaseAuthOption): Promise<NbAuthResult> {
        let providerUser = await this.providerSignIn(options.provider, options.data);
        if (this.defaultOptions.checkEmail == true) {
            await this.checkValidEmailRequest(providerUser)
        }
        let user = await this.user.take(1).toPromise();
        let idToken = await user.getIdToken();
        let tokenResult = await this.loginWithIdToken(idToken);
        return this.createResult(tokenResult);
    }

    createResult(r: NbAuthJWTToken): NbAuthResult {
        return new NbAuthResult(true, this.createSuccessResponse(null), null, null, null, r);
    }

    errorResponse(err) {
        return new NbAuthResult(
            false,
            this.createFailResponse(err),
            null,
            [err]
            [err.message],
            err
        );
    }

    providerSignIn(provider: string, data: any): Promise<firebase.auth.UserCredential> {
        switch (provider) {
            case "google":
                return this._firebaseAuth.auth.signInWithPopup(
                    new firebase.auth.GoogleAuthProvider()
                );
            case "email":
                return this._firebaseAuth.auth.signInWithEmailAndPassword(data.email, data.password);
            default:
                throw "Unknown signin provider: " + provider;
        }
    }

    async checkValidEmailRequest(data: firebase.auth.UserCredential) {
        if (!data.user.emailVerified) {
            await data.user.sendEmailVerification();
            throw "You need to confirm your email first, a new link was sent! Check it and try again.";
        }
    }

    waitPromise() {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res();
            }, 3000);
        })
    }

    loginWithIdToken(token: string): Promise<NbAuthJWTToken> {
        environment.API_ENDPOINT
        let url = environment.API_ENDPOINT + "/api/auth/SignIn";

        return new Promise((resolve, reject) => {
            this._http.post<any>(url.toString(), { idToken: token }).toPromise().then(data => {
                let token = this.createToken<NbAuthJWTToken>(data.accessToken);
                localStorage.setItem("refresh_token", data.refreshToken);
                resolve(token);
            }).catch(err => reject(err))
        })
    }

    loginWithRefreshToken(token: string): Promise<NbAuthJWTToken> {
        environment.API_ENDPOINT
        let url = environment.API_ENDPOINT + "/api/auth/SignIn";

        return new Promise((resolve, reject) => {
            this._http.post<any>(url.toString(), { refreshToken: token }).toPromise().then(data => {
                let token = this.createToken<NbAuthJWTToken>(data.accessToken);
                resolve(token);
            }).catch(err => reject(err))
        })
    }

    register(data?: any): Observable<NbAuthResult> {
        let subject = new Subject<NbAuthResult>();
        this.registerAsync(data).then(e => {
            subject.next(new NbAuthResult(true));
            subject.complete();
        }).catch(e => {
            subject.next(this.errorResponse(e));
            subject.complete();
        })
        return subject.asObservable();
    }

    async registerAsync(data?: any) {
        let afUser: firebase.auth.UserCredential = await this._firebaseAuth.auth.createUserWithEmailAndPassword(data.email, data.password)
        // Update the profile in firebase auth
        await afUser.user.updateProfile({
            displayName: data.fullName,
            photoURL: ""
        })
        await afUser.user.sendEmailVerification();
        // Create the user in firestore
        this._firestore.firestore.collection("users").doc(afUser.user.uid).set(
            {
                uid: afUser.user.uid,
            }
        );
        this._toastr.success("Account created successfully, please check your email!", "Create Account", { duration: 5000 })
    }

    requestPassword(data?: any): Observable<NbAuthResult> {
        let subject = new Subject<NbAuthResult>();
        this._firebaseAuth.auth.sendPasswordResetEmail(data.email).then(() => {
            subject.next(new NbAuthResult(true, null, null, null, ["Please check your email to reset the password"]));
            subject.complete();
        }).catch(e => {
            subject.next(this.errorResponse(e));
            subject.complete();
        })
        return subject.asObservable();
    }

    resetPassword(data?: any): Observable<NbAuthResult> {
        throw "Not implemented";
    }

    logout(data?: any): Observable<NbAuthResult> {
        let subject = new Subject<NbAuthResult>();
        this._firebaseAuth.auth.signOut().then(() => {
            localStorage.clear();
            subject.next(new NbAuthResult(true));
            subject.complete();
        }).catch(e => {
            subject.next(this.errorResponse(e));
            subject.complete();
        })
        return subject.asObservable();
    }

    refreshToken(data?: any): Observable<NbAuthResult> {
        console.log("REFRESH TOKEN CALLED");
        let token = localStorage.getItem("refresh_token");
        return new Observable<NbAuthResult>((observable) => {
            this.loginWithRefreshToken(token).then(ret => {
                observable.next(this.createResult(ret));
            }).catch(err => {
                observable.next(this.errorResponse(err));
            }).then(e => {
                observable.complete();
            })

        })
    }
}