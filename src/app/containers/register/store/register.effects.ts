import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {GetRegisterFail, GetRegisterSuccess, RegistersActionTypes} from './register.actions';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class RegisterEffect {
  @Effect()
  getIsRegister$: Observable<Action>  = this.actions$.pipe(
    ofType(RegistersActionTypes.GET_REGISTER),
    map(() => new GetRegisterSuccess(true)),
    catchError(err => of(new GetRegisterFail(err)))
  );

  constructor(private actions$: Actions) {}
}
