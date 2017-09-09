import { Ng2StateDeclaration, UIRouter } from '@uirouter/angular';
import { ProfileComponent } from './profile.component';
import { AuthService } from '../services/auth.service';

export function requireUser(transition) {
  return transition.injector().get(AuthService).user
    ? true
    : transition.router.stateService.target('products');
}

export const states: Ng2StateDeclaration[] = [
  {
    name: 'profile',
    url: '/profile',
    component: ProfileComponent,
    onEnter: requireUser,
  }
];
