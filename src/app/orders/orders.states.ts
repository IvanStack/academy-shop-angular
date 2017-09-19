import { Ng2StateDeclaration, UIRouter } from '@uirouter/angular';
import { OrdersComponent } from './orders.component';
import { OrderService } from '../services/order.service';
import { requireUser } from '../app.states';

export const states: Ng2StateDeclaration[] = [
  {
    name: 'orders',
    url: '/orders',
    component: OrdersComponent,
    onEnter(transition) {
      const target = requireUser(transition);
      return target === true
        ? transition.injector().get(OrderService).dispatchLoad()
        : target;
    }
  }
];
