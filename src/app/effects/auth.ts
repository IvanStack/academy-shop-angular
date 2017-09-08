import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import * as auth from '../actions/auth';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.LOGIN)
    .switchMap((action: auth.LoginAction) => this.authService.login()
      .then(res => new auth.LoginSuccessAction(res.user))
      .catch(err => of(new auth.ServerFailAction(err)))
    );

  @Effect()
  logout$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.LOGOUT)
    .switchMap((action: auth.LogoutAction) => this.authService.logout()
      .then(res => new auth.LogoutSuccessAction())
      .catch(err => of(new auth.ServerFailAction(err)))
    );


  @Effect()
  refreshToken$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.REFRESH)
    .switchMap((action: auth.RefreshAction) => this.authService.refreshAuth()
      .map(user => user
        ? new auth.LoginSuccessAction(user)
        : new auth.LogoutAction()
      )
    );

  constructor(private actions$: Actions, private authService: AuthService) { }
}
