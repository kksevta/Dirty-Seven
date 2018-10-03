import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { AppCoreService } from '../services/app-core/app-core.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PlayGuard implements CanActivate {

    constructor(private appCoreService: AppCoreService, private router: Router) { }


    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.appCoreService.joinRoom('').pipe(map(authenticated => {
            if (authenticated) {
                return true;
            } else {
                this.router.navigate(['/home']);
                return false;
            }
        }), catchError((error) => {
            this.router.navigate(['/home']);
            return of(false);
        }));
    }
}
