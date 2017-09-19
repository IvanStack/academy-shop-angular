import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import * as orderActions from '../actions/order';
import * as productActions from '../actions/product';
import { Store } from '@ngrx/store';
import { State } from '../reducers';

@Injectable()
export class OrderService {
  constructor(private db: AngularFireDatabase, private store: Store<State>) { }

  dispatchLoad() {
    this.store.dispatch(new productActions.LoadAction());
    this.store.dispatch(new orderActions.LoadAction());
  }

  fetchOrders() {
    return this.db.list('/orders');
  }

  addOrder(data) {
    return this.db.list(`/orders`).push(data)
      .then(ref => ({ ...data, $key: ref.getKey() }))
      .then(order => {
        return this.db.object(`/users/${order.uid}/orders/${order.$key}`).set(true)
          .then(() => order);
      });
  }

  updateOrderStatus(order, orderStatus) {
    return this.db.object(`/orders/${order.$key}/status`).set(orderStatus);
  }

  deleteOrder(order) {
    return this.db.object(`/orders/${order.$key}`).remove();
  }
}
