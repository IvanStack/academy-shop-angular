import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEditComponent } from './user-edit.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    UserEditComponent,
  ],
  declarations: [
    UserEditComponent,
  ]
})
export class UserEditModule { }
