import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadAction, UpdateAction } from '../actions/cart';
import { Store } from '@ngrx/store';
import { State, getUserSelector, getCartSelector } from '../reducers';
import { defaults as cartDefaults } from '../models/cart';

@Injectable()
export class CartService {
  constructor(private db: AngularFireDatabase, private store: Store<State>) { }

  dispatchLoad() {
    this.store.dispatch(new LoadAction());
  }

  fetchCart() {
    return this.store.select(getUserSelector)
      .switchMap(user => user && this.db.object(`/cart/${user.uid}`));
  }

  addProduct({ $key }) {
    return this.fetchCart().take(1)
      .switchMap(cart => {
        const { quantities = {} } = cart;
        return this.updateCart({
          quantities: {
            ...quantities,
            [$key]: (quantities[$key] || 0) + 1,
          },
        });
      });

  }

  updateCart(cart) {
    return this.store.select(getUserSelector).take(1)
      .switchMap(user => user && this.db.object(`/cart/${user.uid}`).set(cart).then(() => cart));
  }
}
