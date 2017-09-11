import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { Product } from '../models/product';
import { AddAction, UpdateAction, DeleteAction } from '../actions/product';

@Component({
  selector: 'app-product',
  template: `
    <md-card>
      <md-card-header>
        <md-icon md-card-avatar *ngIf="!product">library_add</md-icon>
        <md-card-title>{{ product ? product.name : 'Add a new product' }}</md-card-title>
        <md-card-subtitle *ngIf="product">\${{ product.price }}</md-card-subtitle>
      </md-card-header>
      <img md-card-image *ngIf="form.controls.image.value" [src]="form.controls.image.value" [alt]="imageAlt">
      <md-card-content>
        <p *ngIf="canEdit">
          <md-form-field>
            <input mdInput placeholder="Name" [formControl]="form.controls.name">
          </md-form-field>
          <md-form-field>
            <input mdInput placeholder="Price in USD" [formControl]="form.controls.price">
          </md-form-field>
          <md-form-field>
            <input mdInput placeholder="Image URL" [formControl]="form.controls.image">
          </md-form-field>
          <md-form-field>
            <textarea mdInput mdTexttareaAutosize
                placeholder="Description"
                [formControl]="form.controls.description">
            </textarea>
          </md-form-field>
        </p>

        <p *ngIf="!canEdit">{{ product.description }}</p>
      </md-card-content>
      <md-card-actions>
        <span [mdTooltip]="canBuy ? '' : 'Sign in to add to cart'">
          <button md-button *ngIf="product" (click)="addToCart()" [disabled]="!canBuy">
            <md-icon>add_shopping_cart</md-icon> ADD TO CART
          </button>
        </span>
        <button md-button *ngIf="canEdit" (click)="updateProduct()" [disabled]="!canSave">SAVE</button>
        <button md-button color="warn" *ngIf="product && canDelete" (click)="deleteProduct()">DELETE</button>
      </md-card-actions>
    </md-card>
  `,
  styles: [],
})
export class ProductComponent implements OnInit, OnChanges {
  public form: FormGroup;

  @Input() canBuy = false;
  @Input() canEdit = false;
  @Input() canDelete = false;
  @Input() product: Product;

  public get imageAlt() {
    return `Photo of ${this.form.controls.name.value}`;
  }

  public get canSave() {
    return this.form.dirty && this.form.valid;
  }

  constructor(private store: Store<State>, private fb: FormBuilder) { }

  updateForm() {
    const { name = '', price = '', description = '', image = '' } = this.product || {};

    this.form = this.fb.group({
      name: [ name, Validators.compose([ Validators.required, Validators.minLength(5) ]) ],
      price: [ price, Validators.compose([ Validators.required, Validators.pattern(/^\d+(\.\d\d)?$/) ]) ],
      description: [ description, Validators.required ],
      image: [ image, Validators.required ],
    });
  }

  ngOnInit() {
    this.updateForm();
  }

  ngOnChanges() {
    this.updateForm();
  }

  updateProduct() {
    const newProduct = {
      ...this.form.value,
      price: parseFloat(this.form.controls.price.value),
    };

    if (this.product) {
      this.store.dispatch(new UpdateAction({
        oldProduct: this.product,
        newProduct,
      }));
    } else {
      this.store.dispatch(new AddAction(newProduct));
      this.updateForm();
    }
  }

  deleteProduct() {
    this.store.dispatch(new DeleteAction(this.product));
  }

  addToCart() {
    // TODO
  }
}
