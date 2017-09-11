import { Ng2StateDeclaration, UIRouter } from '@uirouter/angular';
import { CartComponent } from './cart.component';
import { AuthService } from '../services/auth.service';

export function requireUser(transition) {
  return transition.injector().get(AuthService).user
    ? true
    : transition.router.stateService.target('products');
}

export const states: Ng2StateDeclaration[] = [
  {
    name: 'cart',
    url: '/cart',
    component: CartComponent,
    onEnter: requireUser,
  }
];
