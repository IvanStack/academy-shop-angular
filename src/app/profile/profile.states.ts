import { Ng2StateDeclaration, UIRouter } from '@uirouter/angular';
import { ProfileComponent } from './profile.component';
import { requireUser } from '../app.states';

export const states: Ng2StateDeclaration[] = [
  {
    name: 'profile',
    url: '/profile',
    component: ProfileComponent,
    onEnter: requireUser,
  }
];
