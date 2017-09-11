import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import * as userActions from '../actions/user';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class UserEffects {
  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(userActions.ActionTypes.LOAD)
    .map((action: userActions.LoadAction) => action.payload)
    .switchMap(payload => this.userService.fetchUsers()
      .map(users => new userActions.LoadSuccessAction(users))
      .catch(err => of(new userActions.ServerFailAction(err)))
    );

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType(userActions.ActionTypes.UPDATE)
    .map((action: userActions.UpdateAction) => action.payload)
    .switchMap(user => this.userService.updateUser(user, this.authService.user)
      .then(() => new userActions.UpdateSuccessAction(user))
      .catch(err => of(new userActions.ServerFailAction(err)))
    );

  @Effect()
  delete$: Observable<Action> = this.actions$
    .ofType(userActions.ActionTypes.DELETE)
    .map((action: userActions.DeleteAction) => action.payload)
    .switchMap(user => this.userService.deleteUser(user)
      .then(() => new userActions.DeleteSuccessAction(user))
      .catch(err => of(new userActions.ServerFailAction(err)))
    );

  constructor(private actions$: Actions, private userService: UserService, private authService: AuthService) { }
}
