import { Component, OnDestroy } from '@angular/core';
import { User } from '../models/user';
import { Store } from '@ngrx/store';
import { State, getUserSelector } from '../reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-profile',
  template: `
    <app-user-edit
        [user]="user$ | async"
        [isCurrentUser]="true"
        [canEditMetadata]="isAdmin$ | async">
    </app-user-edit>
  `,
  styles: []
})
export class ProfileComponent implements OnDestroy {
  private alive = true;
  public user$: Observable<User>;
  public isAdmin$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.user$ = this.store.select(getUserSelector)
      .takeWhile(() => this.alive);

    this.isAdmin$ = this.user$.map(user => user && user.isAdmin ? true : false);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
