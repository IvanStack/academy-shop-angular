import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  LOGIN: type('[Auth] Login'),
  LOGIN_SUCCESS: type('[Auth] Login Success'),
  LOGOUT: type('[Auth] Logout'),
  LOGOUT_SUCCESS: type('[Auth] Logout Success'),
  REFRESH: type('[Auth] Refresh'),
  SERVER_FAIL: type('[Auth] Server Failure'),
};

export class LoginAction implements Action {
  readonly type = ActionTypes.LOGIN;

  constructor(public payload: any = null) { }
}

export class LoginSuccessAction implements Action {
  readonly type = ActionTypes.LOGIN_SUCCESS;

  constructor(public payload: any = null) { }
}

export class LogoutAction implements Action {
  readonly type = ActionTypes.LOGOUT;

  constructor(public payload: any = null) { }
}

export class LogoutSuccessAction implements Action {
  readonly type = ActionTypes.LOGOUT_SUCCESS;

  constructor(public payload: any = null) { }
}

export class RefreshAction implements Action {
  readonly type = ActionTypes.REFRESH;

  constructor(public payload: any = null) { }
}

export class ServerFailAction implements Action {
  readonly type = ActionTypes.SERVER_FAIL;

  constructor(public payload: any = null) { }
}

export type Action
  = LoginAction
  | LoginSuccessAction
  | LogoutAction
  | LogoutSuccessAction
  | RefreshAction
  | ServerFailAction;
