import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getUserSelector } from '../reducers';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LoginAction, LogoutAction } from '../actions/auth';

@Component({
  selector: 'app-navigation',
  template: `
    <md-nav-list>
      <span [mdTooltip]="loggedIn ? user.displayName : ''">
        <md-list-item (click)="toggleAuth()">
          <img *ngIf="loggedIn" mdListAvatar [src]="user.photoURL" [alt]="user.displayName">
          <a mdLine>{{ loggedIn ? 'Sign out' : 'Sign in with Google' }}</a>
        </md-list-item>
      </span>
      <a md-list-item uiSref="products">Products</a>
    </md-nav-list>
  `,
  styles: [`
    md-nav-list {
      min-width: 200px;
    }
  `]
})
export class NavigationComponent implements OnDestroy {
  private alive = true;
  user: any = null;

  public get loggedIn(): boolean {
    return !!this.user;
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

  toggleAuth() {
    const action = this.loggedIn ? LogoutAction : LoginAction;
    this.store.dispatch(new action());
  }
}
