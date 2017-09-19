import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getUserSelector, getCartCountSelector } from '../reducers';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LoginAction } from '../actions/auth';
import { LoadAction } from '../actions/cart';
import { User } from '../models/user';

@Component({
  selector: 'app-navigation',
  template: `
    <md-nav-list>
      <ng-container *ngIf="loggedIn; else signInLink">
        <md-list-item uiSref="profile">
          <img mdListAvatar *ngIf="user.photoURL" [src]="user.photoURL" [alt]="user.displayName">
          <a mdLine>{{ user.displayName }}</a>
        </md-list-item>
        <md-list-item uiSref="cart">
          <md-icon mdListIcon>shopping_cart</md-icon>
          <a mdLine>Shopping Cart</a>
          <md-chip-list *ngIf="hasCartItems$ | async">
            <md-chip color="accent" selected="true">{{ cartCount$ | async }}</md-chip>
          </md-chip-list>
        </md-list-item>
        <md-list-item uiSref="orders">
          <md-icon mdListIcon>library_books</md-icon>
          <a mdLine>Orders</a>
        </md-list-item>
      </ng-container>
      <ng-template #signInLink>
        <md-list-item (click)="signIn()">
          <md-icon mdListIcon>power_settings_new</md-icon>
          <a mdLine>Sign in with Google</a>
        </md-list-item>
      </ng-template>
      <md-list-item uiSref="products">
        <md-icon mdListIcon>gesture</md-icon>
        <a mdLine>Products</a>
      </md-list-item>
      <md-list-item uiSref="users" *ngIf="isAdmin">
        <md-icon mdListIcon>people</md-icon>
        <a mdLine>Users</a>
      </md-list-item>
    </md-nav-list>
  `,
  styles: [`
    md-nav-list {
      width: 275px;
    }
  `]
})
export class NavigationComponent implements OnDestroy {
  private alive = true;

  public user: User = null;
  public cartCount$: Observable<number>;
  public hasCartItems$: Observable<boolean>;

  public get loggedIn(): boolean {
    return !!this.user;
  }

  public get isAdmin(): boolean {
    return !!(this.user && this.user.isAdmin);
  }

  constructor(private store: Store<State>) {
    this.store.select(getUserSelector)
      .subscribe(user => {
        this.user = user;
        this.store.dispatch(new LoadAction());
      });

    this.cartCount$ = this.store.select(getCartCountSelector);
    this.hasCartItems$ = this.cartCount$.map(count => count > 0);
  }

  ngOnDestroy() {
    this.alive = false;
  }

  signIn() {
    this.store.dispatch(new LoginAction());
  }
}
