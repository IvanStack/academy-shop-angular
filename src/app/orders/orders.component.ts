import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getUserSelector, getOrdersSelector } from '../reducers';
import { Observable } from 'rxjs/Observable';
import { Order } from '../models/order';
import * as orderActions from '../actions/order';

@Component({
  selector: 'app-orders',
  template: `
    <div fxLayout="row" fxLayoutAlign="space-between start" fxLayoutWrap="wrap">
      <ng-container *ngFor="let order of orders$ | async">
        <app-order
            [order]="order"
            [canDelete]="isAdmin$ | async"
            [canEditStatus]="isManager$ | async">
        </app-order>
      </ng-container>
    </div>
  `,
  styles: [],
})
export class OrdersComponent implements OnDestroy {
  private alive = true;

  public orders$: Observable<any[]>;
  public isAdmin$: Observable<boolean>;
  public isManager$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.orders$ = this.store.select(getOrdersSelector)
      .takeWhile(() => this.alive);

    this.isAdmin$ = this.store.select(getUserSelector)
      .takeWhile(() => this.alive)
      .map(user => !!(user && user.isAdmin));

    this.isManager$ = this.store.select(getUserSelector)
      .takeWhile(() => this.alive)
      .map(user => !!(user && user.isManager));
 }

  ngOnDestroy() {
    this.alive = false;
  }
}
