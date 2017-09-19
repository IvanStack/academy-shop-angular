import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import * as routes from './orders.states';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrderService } from '../services/order.service';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,

    UIRouterModule.forChild(routes),
  ],
  declarations: [
    OrdersComponent,
  ],
  providers: [
    OrderService,
  ],
})
export class OrdersModule { }
