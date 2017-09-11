import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getUserSelector, getSortedUsersSelector } from '../reducers';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

@Component({
  selector: 'app-users',
  template: `
    <div fxLayout="row" fxLayoutAlign="space-between start" fxLayoutWrap="wrap">
      <ng-container *ngFor="let user of users$ | async">
        <app-user-edit *ngIf="isEditing(user);else readonlyUser"
            (onDone)="doneEditing()"
            [user]="user"
            [isCurrentUser]="isCurrentUser(user)"
            [canCancel]="true"
            [canEditMetadata]="true">
        </app-user-edit>

        <ng-template #readonlyUser>
          <md-card>
            <md-card-header>
              <img md-card-avatar [src]="user.photoURL">
              <md-card-title>{{ user.displayName }}</md-card-title>
              <md-card-subtitle>{{ user.email }}</md-card-subtitle>
            </md-card-header>
            <md-card-actions>
              <button md-button (click)="edit(user)">EDIT</button>
            </md-card-actions>
          </md-card>
        </ng-template>
      </ng-container>
    </div>
  `,
  styles: [`
    md-card,
    app-user-edit {
      margin-bottom: 15px;
    }
  `]
})
export class UsersComponent implements OnDestroy {
  private alive = true;
  private user: User;
  private editingUID: string = null;

  public users$: Observable<User[]>;

  public doneEditing() {
    this.editingUID = null;
  }

  public isCurrentUser(user) {
    return this.user && this.user.uid === user.uid;
  }

  public isEditing(user) {
    return this.editingUID === user.uid;
  }

  public edit(user) {
    this.editingUID = user.uid;
  }

  constructor(private store: Store<State>) {
    this.users$ = this.store.select(getSortedUsersSelector)
      .takeWhile(() => this.alive);

    this.store.select(getUserSelector)
      .takeWhile(() => this.alive)
      .subscribe(user => {
        this.user = user;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
