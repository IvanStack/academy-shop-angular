import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import * as orderActions from '../actions/order';

@Component({
  selector: 'app-order',
  template: `
    <md-card>
      <md-card-header>
        <md-card-title>
          \${{ order.price }}
          (<ng-container *ngIf="canEditStatus; then editStatus else showStatus"></ng-container>)
          <ng-template #editStatus>
            <md-form-field *ngIf="canEditStatus">
              <input mdInput placeholder="Status" [formControl]="form.controls.status">
            </md-form-field>
          </ng-template>
          <ng-template #showStatus>{{ order.status }}</ng-template>
        </md-card-title>
        <md-card-subtitle>{{ order.shippingAddress }}</md-card-subtitle>
      </md-card-header>
      <md-card-content>
        <md-list>
          <md-list-item *ngFor="let item of order.items">
            <img mdListAvatar [src]="item.product.image">
            <h4 md-line>{{ item.product.name }}</h4>
            <h4 md-line>
              {{ item.quantity }} x \${{ item.product.price }}
              = \${{ item.quantity * item.product.price }}
            </h4>
          </md-list-item>
        </md-list>
      </md-card-content>
      <md-card-actions *ngIf="hasControls">
        <button md-button
            *ngIf="canEditStatus"
            (click)="updateOrder()"
            [disabled]="form.pristine">
          UPDATE
        </button>
        <button md-button
            *ngIf="canDelete"
            color="warn"
            (click)="deleteOrder()">
          DELETE
        </button>
      </md-card-actions>
    </md-card>
  `,
  styles: [`
    md-card {
      margin-bottom: 15px;
      width: 300px;
    }

    md-card-subtitle {
      white-space: pre;
    }
  `]
})
export class OrderComponent implements OnInit {
  @Input() order;
  @Input() canDelete = false;
  @Input() canEditStatus = false;

  public form: FormGroup;

  get hasControls() {
    return this.canDelete || this.canEditStatus;
  }

  constructor(private store: Store<State>, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      status: [
        this.order.order.status,
        Validators.compose([ Validators.required, Validators.minLength(3) ]),
      ],
    });
  }

  updateOrder() {
    const { order } = this.order;
    const orderStatus = this.form.controls.status.value;

    this.store.dispatch(new orderActions.UpdateStatusAction({ order, orderStatus }));
  }

  deleteOrder() {
    this.store.dispatch(new orderActions.DeleteAction(this.order.order));
  }
}
