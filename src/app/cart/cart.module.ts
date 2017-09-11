import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import * as routes from './cart.states';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { UserEditModule } from '../user-edit/user-edit.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    UserEditModule,

    FormsModule,
    ReactiveFormsModule,

    UIRouterModule.forChild(routes),
  ],
  declarations: [
    CartComponent,
  ]
})
export class CartModule { }
