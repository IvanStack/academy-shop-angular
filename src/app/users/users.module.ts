import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import * as routes from './users.states';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserService } from '../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    UsersComponent,
    UserEditComponent,
  ],
  providers: [
    UserService,
  ],
})
export class UsersModule { }
