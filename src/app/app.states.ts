import { Ng2StateDeclaration, UIRouter } from '@uirouter/angular';
import { ProductsComponent } from './products/products.component';
import { Injector } from '@angular/core';

export function config(router: UIRouter, injector: Injector) {
  router.urlService.rules.otherwise({ state: 'products' });
}

export const states: Ng2StateDeclaration[] = [
  { name: 'products', url: '/products', component: ProductsComponent },
];
