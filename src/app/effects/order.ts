import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { defaults as cartDefaults } from '../models/cart';
import * as orderActions from '../actions/order';
import * as cartActions from '../actions/cart';
import { OrderService } from '../services/order.service';

@Injectable()
export class OrderEffects {
  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(orderActions.ActionTypes.LOAD)
    .map((action: orderActions.LoadAction) => action.payload)
    .switchMap(() => this.orderService.fetchOrders()
      .map(orders => new orderActions.LoadSuccessAction(orders))
      .catch(err => of(new orderActions.ServerFailAction(err)))
    );

  @Effect()
  add$: Observable<Action> = this.actions$
    .ofType(orderActions.ActionTypes.ADD)
    .map((action: orderActions.AddAction) => action.payload)
    .switchMap(order => this.orderService.addOrder(order)
      .then(
        () => new orderActions.AddSuccessAction(order),
        err => new orderActions.ServerFailAction(err)
      )
    );

  @Effect()
  addSuccess$: Observable<Action> = this.actions$
    .ofType(orderActions.ActionTypes.ADD_SUCCESS)
    .map((action: orderActions.AddSuccessAction) => action.payload)
    .switchMap(() => of(new cartActions.UpdateAction({ ...cartDefaults })));

  @Effect()
  delete$: Observable<Action> = this.actions$
    .ofType(orderActions.ActionTypes.DELETE)
    .map((action: orderActions.DeleteAction) => action.payload)
    .switchMap(order => this.orderService.deleteOrder(order)
      .then(
        () => new orderActions.DeleteSuccessAction(order),
        err => new orderActions.ServerFailAction(err)
      )
    );

  constructor(private actions$: Actions, private orderService: OrderService) { }
}
