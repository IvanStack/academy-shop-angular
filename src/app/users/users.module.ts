import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import * as routes from './users.states';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserEditModule } from '../user-edit/user-edit.module';
import { UserService } from '../services/user.service';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    UserEditModule,

    UIRouterModule.forChild(routes),
  ],
  declarations: [
    UsersComponent,
  ],
  providers: [
    UserService,
  ],
})
export class UsersModule { }
