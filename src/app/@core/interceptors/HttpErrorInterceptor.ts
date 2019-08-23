import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private toastrService: NbToastrService, private router: Router) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errMsg = '';
                    // Client Side Error
                    if (error.error instanceof ErrorEvent) {
                        errMsg = `Error: ${error.error.message}`;
                    } else if (error.error instanceof ProgressEvent) {
                        errMsg = 'Network error';
                    }
                    else {  // Server Side Error
                        if (error.status == 401) {//Unauthorized
                            errMsg = 'Unauthorized';
                            this.router.navigate(['/auth/login']);
                        } else if (typeof error.error !== typeof Object) {
                            errMsg = error.error;
                        } else {
                            errMsg = `Error code:${error.status}, Message: ${error.message}`;
                        }
                    }
                    this.toastrService.danger(errMsg, 'Error');
                    return throwError(errMsg);
                }),
            );
    }
}
