import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import * as cartActions from '../actions/cart';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product';

@Injectable()
export class CartEffects {
  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(cartActions.ActionTypes.LOAD)
    .map((action: cartActions.LoadAction) => action.payload)
    .switchMap(payload => this.cartService.fetchCart()
      .map(cart => new cartActions.LoadSuccessAction(cart))
      .catch(err => of(new cartActions.ServerFailAction(err)))
    );

  @Effect()
  add$: Observable<Action> = this.actions$
    .ofType(cartActions.ActionTypes.ADD)
    .map((action: cartActions.AddAction) => action.payload)
    .switchMap(product => this.cartService.addProduct(product)
      .map(cart => new cartActions.AddSuccessAction(cart))
      .catch(err => of(new cartActions.ServerFailAction(err)))
    );

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType(cartActions.ActionTypes.UPDATE)
    .map((action: cartActions.UpdateAction) => action.payload)
    .switchMap(cart => this.cartService.updateCart(cart)
      .map(() => new cartActions.UpdateSuccessAction(cart))
      .catch(err => of(new cartActions.ServerFailAction(err)))
    );

  constructor(private actions$: Actions, private cartService: CartService) { }
}
