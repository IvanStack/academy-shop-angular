import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import * as auth from '../actions/auth';
import { AuthService } from '../services/auth.service';
import { UIRouter } from '@uirouter/angular';

@Injectable()
export class AuthEffects {
  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.LOGIN)
    .map((action: auth.LoginAction) => action.payload)
    .switchMap(payload => this.authService.login()
      .then(res => new auth.LoginSuccessAction(res.user))
      .catch(err => new auth.ServerFailAction(err))
    );

  @Effect()
  logout$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.LOGOUT)
    .map((action: auth.LogoutAction) => action.payload)
    .switchMap(payload => this.authService.logout()
      .then(res => {
        this.router.stateService.go('products');
        return new auth.LogoutSuccessAction();
      })
      .catch(err => new auth.ServerFailAction(err))
    );

  @Effect()
  refreshToken$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.REFRESH)
    .map((action: auth.RefreshAction) => action.payload)
    .switchMap(payload => this.authService.refreshAuth()
      .map(user => user
        ? new auth.LoginSuccessAction(user)
        : new auth.LogoutAction()
      )
    );

  constructor(private actions$: Actions, private authService: AuthService, private router: UIRouter) { }
}
