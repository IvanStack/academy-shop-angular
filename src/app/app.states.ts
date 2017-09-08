import { Ng2StateDeclaration, UIRouter } from '@uirouter/angular';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { Injector } from '@angular/core';
import { AuthService } from './services/auth.service';

export function requireUser(transition) {
  return transition.injector().get(AuthService).user
    ? true
    : transition.router.stateService.target('products');
}

export function uiRouterConfigFn(router: UIRouter, injector: Injector) {
  router.urlService.rules.otherwise({ state: 'products' });
}

export const MAIN_STATES: Ng2StateDeclaration[] = [
  { name: 'products', url: '/products', component: ProductsComponent },
  { name: 'profile', url: '/profile', component: ProfileComponent, onEnter: requireUser },
];
