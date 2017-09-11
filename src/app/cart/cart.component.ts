import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../models/product';
import { Order } from '../models/order';
import { Store } from '@ngrx/store';
import { State, getProductsSelector, getCartSelector, getUserSelector } from '../reducers';
import { Observable } from 'rxjs/Observable';
import * as productActions from '../actions/product';
import * as cartActions from '../actions/cart';

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
        <md-list-item>
          <h4 md-line>
            Total <small *ngIf="form.dirty">(Update the cart to see the correct total)</small>
          </h4>
          <p md-line>\${{ total$ | async }}</p>
        </md-list-item>
        <md-list-item>
          <h4 md-line>
            Shipping Address <small>(change in <a uiSref="profile">user profile</a>)</small>
          </h4>
          <p md-line>{{ shippingAddress$ | async }}</p>
        </md-list-item>
      </md-list>
      <md-card-actions>
        <button md-button (click)="updateCart()" [disabled]="form.pristine || !form.valid">UPDATE</button>
      </md-card-actions>
    </md-card>
  `,
  styles: []
})
export class CartComponent implements OnDestroy {
  private alive = true;
  private cart: Order;

  public form: FormGroup;
  public shippingAddress: string;
  public shippingAddress$: Observable<string>;
  public items$: Observable<OrderItem[]>;
  public total$: Observable<number>;

  public get updatedCart() {
    return {
      ...this.cart,
      quantities: this.form.value,
    };
  }

  constructor(private store: Store<State>, private fb: FormBuilder) {
    this.store.dispatch(new productActions.LoadAction());
    this.shippingAddress$ = this.store.select(getUserSelector)
      .map(user => user && user.shippingAddress);

    this.shippingAddress$
      .takeWhile(() => this.alive)
      .subscribe(address => {
        this.shippingAddress = address;
      });

    this.items$ = this.store.select(getProductsSelector)
      .takeWhile(() => this.alive)
      .map(products => products.reduce((byHash, product) => ({ ...byHash, [product.$key]: product }), {}))
      .switchMap(products => this.store.select(getCartSelector)
        .takeWhile(() => this.alive)
        .map(cart => {
          this.cart = cart;

          const items = Object.keys(cart.quantities).map(key => ({
            product: products[key],
            quantity: cart.quantities[key]
          })).filter(item => item.product && item.quantity > 0);

          this.form = this.fb.group(
            items.reduce((controls, item) => ({
              ...controls,
              [item.product.$key]: [ item.quantity, Validators.pattern(/^[0-9]+$/) ],
            }), {})
          );

          return items;
        })
      );

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
}
