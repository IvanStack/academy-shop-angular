import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getUserSelector } from '../reducers';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LoginAction } from '../actions/auth';

@Component({
  selector: 'app-navigation',
  template: `
    <md-nav-list>
      <md-list-item uiSref="profile" *ngIf="loggedIn;else signInLink">
        <img mdListAvatar *ngIf="user.photoURL" [src]="user.photoURL" [alt]="user.displayName">
        <a mdLine>{{ user.displayName }}</a>
      </md-list-item>
      <ng-template #signInLink>
        <a md-list-item (click)="signIn()">Sign in with Google</a>
      </ng-template>
      <a md-list-item uiSref="products">Products</a>
      <a md-list-item uiSref="users" *ngIf="isAdmin">Users</a>
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
  user: any = null;

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
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  signIn() {
    this.store.dispatch(new LoginAction());
  }
}
