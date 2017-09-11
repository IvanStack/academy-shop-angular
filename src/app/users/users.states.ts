import { Ng2StateDeclaration, UIRouter } from '@uirouter/angular';
import { UsersComponent } from './users.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

export function requireAdmin(transition) {
  return transition.injector().get(AuthService).user.isAdmin
    ? transition.injector().get(UserService).dispatchLoad()
    : transition.router.stateService.target('products');
}

export const states: Ng2StateDeclaration[] = [
  {
    name: 'users',
    url: '/users',
    component: UsersComponent,
    onEnter: requireAdmin,
  }
];
