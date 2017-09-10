import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {
  constructor(private db: AngularFireDatabase) { }

  fetchUsers() {
    return this.db.list('/users');
  }

  userProps({ isAdmin, isManager, ...user }, type = 'user') {
    return type === 'user' ? user : { isAdmin, isManager };
  }

  updateUser(user, currentUser = null) {
    return this.db.object(`/users/${user.uid}`)
      .set(this.userProps(user))
      .then(() => {
        if (currentUser && currentUser.isAdmin) {
          return this.db.object(`/roles/${user.uid}`)
            .set(this.userProps(user, 'roles'));
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
