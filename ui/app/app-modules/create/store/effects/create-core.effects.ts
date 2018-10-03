import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AppCoreService } from '@app/core/services/app-core/app-core.service';
import { ActionTypes, SetSomethingAction } from '../actions/create-core.actions';

@Injectable()
export class CreateCoreEffects {
    constructor(private appCoreService: AppCoreService, private actions$: Actions) { }
    @Effect()
    setSomething$: Observable<SetSomethingAction> = this.actions$.pipe(
        ofType(ActionTypes.SOME_ACTION),
        mergeMap((action: SetSomethingAction) =>
            this.appCoreService.joinRoom('').pipe(
                map(data => ({ type: ActionTypes.SOME_ACTION, payload: data })),
                catchError(() => of({ type: ActionTypes.SOME_ACTION }))
            )
        )
    );

}
