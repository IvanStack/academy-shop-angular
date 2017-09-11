import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadAction } from '../actions/cart';
import { orderProps } from '../models/order';
import { Store } from '@ngrx/store';
import { State, getUserSelector, getCartSelector } from '../reducers';

@Injectable()
export class CartService {
  constructor(private db: AngularFireDatabase, private store: Store<State>) { }

  dispatchLoad() {
    this.store.dispatch(new LoadAction());
  }

  fetchCart() {
    return this.store.select(getUserSelector)
      .switchMap(user => user && this.db.object(`/cart/${user.uid}`)
        .map(cart => orderProps(cart))
      );
  }

  addProduct({ $key }) {
    return this.fetchCart().take(1)
      .switchMap(cart => this.updateCart({
        ...cart,
        quantities: {
          ...cart.quantities,
          [$key]: (cart.quantities[$key] || 0) + 1,
        },
      }));
  }

  updateCart(cart) {
    return this.store.select(getUserSelector).take(1)
      .switchMap(user => user && this.db.object(`/cart/${user.uid}`).set(cart));
  }
}
