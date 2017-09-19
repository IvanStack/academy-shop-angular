import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import * as firebase from 'firebase/app';
import * as orderActions from '../actions/order';
import * as productActions from '../actions/product';
import { Store } from '@ngrx/store';
import { State, getUserSelector } from '../reducers';

@Injectable()
export class OrderService {
  constructor(private db: AngularFireDatabase, private store: Store<State>) { }

  dispatchLoad() {
    this.store.dispatch(new productActions.LoadAction());
    this.store.dispatch(new orderActions.LoadAction());
  }

  fetchOrders() {
    return this.store.select(getUserSelector)
      .switchMap(user => {
        if (!user) {
          return null;
        } else if (user.isAdmin || user.isManager) {
          return this.db.list('/orders');
        } else {
          return combineLatest(
            Object.keys(user.orders || {}).map(key => this.db.object(`/orders/${key}`))
          );
        }
      });
  }

  addOrder(data) {
    return this.db.list(`/orders`).push(data)
      .then(ref => ({ ...data, $key: ref.getKey() }))
      .then(order => {
        return this.db.object(`/users/${order.uid}/orders/${order.$key}`).set(true)
          .then(() => order);
      });
  }

  updateOrderStatus({ order, orderStatus }) {
    return this.db.object(`/orders/${order.$key}/status`).set(orderStatus);
  }

  deleteOrder(order) {
    return combineLatest(
      this.db.object(`/orders/${order.$key}`).remove(),
      this.db.object(`/users/${order.uid}/orders/${order.$key}`).remove(),
    );
  }
}
