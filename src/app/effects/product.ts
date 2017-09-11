import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import * as productActions from '../actions/product';
import { ProductService } from '../services/product.service';
import { UIRouter } from '@uirouter/angular';
import { Product } from '../models/product';

@Injectable()
export class ProductEffects {
  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(productActions.ActionTypes.LOAD)
    .map((action: productActions.LoadAction) => action.payload)
    .switchMap(payload => this.productService.fetchProducts()
      .map(users => new productActions.LoadSuccessAction(users))
      .catch(err => of(new productActions.ServerFailAction(err)))
    );

  @Effect()
  add$: Observable<Action> = this.actions$
    .ofType(productActions.ActionTypes.ADD)
    .map((action: productActions.AddAction) => action.payload)
    .switchMap(product => this.productService.addProduct(product)
      .then(
        () => new productActions.AddSuccessAction(product),
        err => new productActions.ServerFailAction(err),
      )
    );

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType(productActions.ActionTypes.UPDATE)
    .map((action: productActions.UpdateAction) => action.payload)
    .switchMap(productData => this.productService.updateProduct(productData)
      .then(
        () => new productActions.UpdateSuccessAction(productData),
        err => new productActions.ServerFailAction(err),
      )
    );

  @Effect()
  delete$: Observable<Action> = this.actions$
    .ofType(productActions.ActionTypes.DELETE)
    .map((action: productActions.DeleteAction) => action.payload)
    .switchMap(product => this.productService.deleteProduct(product)
      .then(
        () => new productActions.DeleteSuccessAction(product),
        err => new productActions.ServerFailAction(err)
      )
    );

  constructor(private actions$: Actions, private productService: ProductService, private router: UIRouter) { }
}
