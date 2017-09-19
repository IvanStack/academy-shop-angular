import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../models/product';
import { Order } from '../models/order';
import { Store } from '@ngrx/store';
import { User } from '../models/user';
import { State, getProductsByHashSelector, getCartSelector, getUserSelector } from '../reducers';
import { Observable } from 'rxjs/Observable';
import * as productActions from '../actions/product';
import * as cartActions from '../actions/cart';
import * as orderActions from '../actions/order';

interface OrderItem {
  product: Product;
  quantity: number;
}

interface ProductHash {
  [key: string]: Product;
}

@Component({
  selector: 'app-cart',
  template: `
    <md-card>
      <md-list>
        <md-list-item *ngFor="let item of items$ | async">
          <img mdListAvatar [src]="item.product.image">
          <h4 md-line>{{ item.product.name }}</h4>
          <p md-line>
            \${{ item.product.price }}
            x
            <md-form-field>
              <input mdInput placeholder="Quantity" type="number" [formControl]="form.controls[item.product.$key]">
            </md-form-field>
            =
            \${{ item.product.price * form.controls[item.product.$key].value }}
          </p>
        </md-list-item>
        <md-list-item *ngIf="hasItems$ | async; else viewOrders">
          <h4 md-line>
            Total <small *ngIf="form.dirty">(Update the cart to see the correct total)</small>
          </h4>
          <p md-line>\${{ total$ | async }}</p>
        </md-list-item>
        <ng-template #viewOrders>
          <md-list-item>
            <h4 md-line>You have no items in your shopping cart.</h4>
            <h4 md-line>
              You can <a uiSref="orders">view previous orders</a> or <a uiSref="products">find new products</a>.
            </h4>
          </md-list-item>
        </ng-template>
        <md-list-item>
          <h4 md-line>
            Shipping Address <small>(change in <a uiSref="profile">user profile</a>)</small>
          </h4>
          <div md-line><pre>{{ shippingAddress$ | async }}</pre></div>
        </md-list-item>
      </md-list>
      <md-card-actions>
        <button md-button (click)="updateCart()" [disabled]="form.pristine || !form.valid">UPDATE ORDER</button>
        <button md-button (click)="confirmOrder()" [disabled]="form.dirty" *ngIf="hasItems$ | async">FINISH CHECKOUT</button>
      </md-card-actions>
    </md-card>
  `,
  styles: [`
    pre {
      margin: 0;
    }
  `]
})
export class CartComponent implements OnDestroy {
  private alive = true;

  public form: FormGroup;
  public user: User;
  public shippingAddress$: Observable<string>;
  public items$: Observable<OrderItem[]>;
  public total$: Observable<number>;
  public hasItems$: Observable<boolean>;

  public get updatedCart() {
    return {
      quantities: this.form.value,
    };
  }

  public get newOrder() {
    return {
      ...this.updatedCart,
      status: 'New',
      uid: this.user.uid,
      shippingAddress: this.user.shippingAddress,
    };
  }

  constructor(private store: Store<State>, private fb: FormBuilder) {
    this.store.dispatch(new productActions.LoadAction());

    this.shippingAddress$ = this.store.select(getUserSelector)
      .takeWhile(() => this.alive)
      .map(user => {
        this.user = user;
        return user && user.shippingAddress;
      });

    this.items$ = this.store.select(getCartSelector)
      .takeWhile(() => this.alive)
      .map(cart => {
        this.form = this.fb.group(
          cart.items.reduce((controls, item) => ({
            ...controls,
            [item.product.$key]: [ item.quantity, Validators.pattern(/^[0-9]+$/) ],
          }), {})
        );

        return cart.items;
      });

    this.hasItems$ = this.items$
      .takeWhile(() => this.alive)
      .map(items => items.length > 0);

    this.total$ = this.items$
      .takeWhile(() => this.alive)
      .map(items => items.reduce((sum, item) => sum + (item.quantity * item.product.price), 0));
  }

  ngOnDestroy() {
    this.alive = false;
  }

  updateCart() {
    this.store.dispatch(new cartActions.UpdateAction(this.updatedCart));
  }

  confirmOrder() {
    this.store.dispatch(new orderActions.AddAction(this.newOrder));
  }
}
