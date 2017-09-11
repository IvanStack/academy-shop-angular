import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import * as firebase from 'firebase/app';
import { LoadAction } from '../actions/user';
import { Store } from '@ngrx/store';
import { State } from '../reducers';

@Injectable()
export class UserService {
  constructor(private db: AngularFireDatabase, private store: Store<State>) { }

  dispatchLoad() {
    this.store.dispatch(new LoadAction());
  }

  fetchUsers() {
    return this.db.list('/users')
      .switchMap(users => this.db.list('/roles')
        .map(roles => ({ roles, users  }))
      );
  }

  userProps({ isAdmin, isManager, ...user }, getRoles = false) {
    return getRoles ? { isAdmin, isManager } : user;
  }

  updateUser(user, currentUser = null) {
    return this.db.object(`/users/${user.uid}`)
      .set(this.userProps(user))
      .then(() => {
        if (currentUser && currentUser.isAdmin) {
          return this.db.object(`/roles/${user.uid}`)
            .set(this.userProps(user, true));
        }
      })
      .then(() => user);
  }

  deleteUser(user) {
    return this.db.object(`/users/${user.uid}`)
      .remove()
      .then(() => true);
  }
}
