import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, finalize, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { SetAuthTokenAction } from '@app/store/actions/app-core.actions';
import { getAuthTokenFromAppState } from '@app/store/reducers/root.reducer';

export class CoreHttpInterceptor implements HttpInterceptor {
    constructor(private store: Store<any>) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authToken = '';
        this.store.select(getAuthTokenFromAppState).pipe(take(1)).subscribe((AT) => {
            authToken = AT;
        });
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + authToken) });
        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse && event.headers.get('token')) {
                this.store.dispatch(new SetAuthTokenAction(event.headers.get('token')));
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {

                }
            }
        }));
    }
}
