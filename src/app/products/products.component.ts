import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getProductsSelector, getUserSelector } from '../reducers';
import { Product } from '../models/product';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-products',
  template: `
    <div fxLayout="row" fxLayoutAlign="space-between start" fxLayoutWrap="wrap">
      <app-product *ngIf="isManager$ | async" [canEdit]="true"></app-product>

      <app-product
          *ngFor="let product of products$ | async"
          [canBuy]="signedIn$ | async"
          [canEdit]="isManager$ || isAdmin$ | async"
          [canDelete]="isAdmin$ | async"
          [product]="product">
      </app-product>
    </div>
  `,
  styles: [`
    app-product {
      width: 400px;
      box-sizing: border-box;
      margin-bottom: 15px;
    }
  `]
})
export class ProductsComponent implements OnDestroy {
  private alive = true;

  public products$: Observable<Product[]>;
  public signedIn$: Observable<boolean>;
  public isAdmin$: Observable<boolean>;
  public isManager$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.products$ = this.store.select(getProductsSelector)
      .takeWhile(() => this.alive);

    this.signedIn$ = this.store.select(getUserSelector)
      .takeWhile(() => this.alive)
      .map(user => !!user);

    this.isManager$ = this.store.select(getUserSelector)
      .takeWhile(() => this.alive)
      .map(user => !!(user && user.isManager));

    this.isAdmin$ = this.store.select(getUserSelector)
      .takeWhile(() => this.alive)
      .map(user => !!(user && user.isAdmin));
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
