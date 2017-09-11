import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { User, roleDefaults, userProps } from '../models/user';
import * as firebase from 'firebase/app';
import { Store } from '@ngrx/store';
import { State, getUserSelector } from '../reducers';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  public user: User = null;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private store: Store<State>,
    private userService: UserService
  ) {
    this.store.select(getUserSelector)
      .subscribe(user => {
        this.user = user;
      });
  }

  login() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  getRole(uid: string) {
    return this.db.object(`/roles/${uid}`)
      .map((data = {}) => ({ ...roleDefaults, ...data }))
      .catch(() => of(roleDefaults));
  }

  getProfile(user: User) {
    return this.db.object(`/users/${user.uid}`).switchMap(profile => {
      if (profile.$exists()) {
        return of({ ...user, ...profile });
      } else {
        return this.userService.updateUser(user);
      }
    });
  }

  mergeRoleAndProfile(afUser): Observable<User | null> {
    if (!afUser) {
      return of(null);
    }

    const user = userProps(afUser);

    return this.getRole(user.uid)
      .switchMap(role => this.getProfile(user)
        .map(profile => ({ ...profile, ...role }))
      );
  }

  refreshAuth() {
    return this.afAuth.authState
      .switchMap(user => this.mergeRoleAndProfile(user));
  }
}
