import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import * as routes from './profile.states';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,

    UIRouterModule.forChild(routes),
  ],
  declarations: [
    ProfileComponent,
    UserEditComponent,
  ]
})
export class ProfileModule { }
