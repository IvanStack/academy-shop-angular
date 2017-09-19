import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import * as routes from './orders.states';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrderComponent } from './order.component';
import { OrderService } from '../services/order.service';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,

    FormsModule,
    ReactiveFormsModule,

    UIRouterModule.forChild(routes),
  ],
  declarations: [
    OrdersComponent,
    OrderComponent,
  ],
  providers: [
    OrderService,
  ],
})
export class OrdersModule { }
