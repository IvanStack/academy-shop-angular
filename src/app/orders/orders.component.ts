import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getUserSelector, getOrdersSelector } from '../reducers';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { Order } from '../models/order';
import * as orderActions from '../actions/order';

@Component({
  selector: 'app-orders',
  template: `
    <div fxLayout="row" fxLayoutAlign="space-between start" fxLayoutWrap="wrap">
      <ng-container *ngFor="let order of orders$ | async">
        <md-card>
          <md-card-header>
            <md-card-title>\${{ order.price }} ({{ order.status }})</md-card-title>
            <md-card-subtitle>{{ order.shippingAddress }}</md-card-subtitle>
          </md-card-header>
          <md-card-content>
            <md-list>
              <md-list-item *ngFor="let item of order.items">
                <img mdListAvatar [src]="item.product.image">
                <h4 md-line>{{ item.product.name }}</h4>
                <h4 md-line>
                  {{ item.quantity }} x \${{ item.product.price }}
                  = \${{ item.quantity * item.product.price }}
                </h4>
              </md-list-item>
            </md-list>
          </md-card-content>
          <md-card-actions *ngIf="isAdmin$ | async">
            <button color="warn" md-button (click)="delete(order.order)">DELETE</button>
          </md-card-actions>
        </md-card>
      </ng-container>
    </div>
  `,
  styles: [`
    md-card {
      margin-bottom: 15px;
      width: 300px;
    }

    md-card-subtitle {
      white-space: pre;
    }
  `]
})
export class OrdersComponent implements OnDestroy {
  private alive = true;

  public orders$: Observable<any[]>;
  public isAdmin$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.orders$ = this.store.select(getOrdersSelector)
      .takeWhile(() => this.alive);

    this.isAdmin$ = this.store.select(getUserSelector)
      .takeWhile(() => this.alive)
      .map(user => !!(user && user.isAdmin));
 }

  ngOnDestroy() {
    this.alive = false;
  }

  delete(order) {
    this.store.dispatch(new orderActions.DeleteAction(order));
  }
}
