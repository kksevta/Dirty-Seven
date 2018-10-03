import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ActionTypes, JoinRoomRequestAction } from '../actions/app-core.actions';
import { Router } from '@angular/router';
import { AppCoreService } from '@app/core/services/app-core/app-core.service';

@Injectable()
export class AppCoreEffects {
    constructor(private actions$: Actions, private router: Router, private appCoreService: AppCoreService) { }

    @Effect()
    joinRoomRequest$: Observable<JoinRoomRequestAction> = this.actions$.pipe(
        ofType(ActionTypes.JOIN_ROOM_REQUEST),
        mergeMap((action: JoinRoomRequestAction) =>
            this.appCoreService.joinRoom('').pipe(
                switchMap(data => {
                    return [
                        new JoinRoomRequestAction(data),
                    ];
                }),
                catchError(() => of({ type: ActionTypes.JOIN_ROOM_REQUEST }))
            )
        )
    );

}
