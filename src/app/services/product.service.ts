import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadAction } from '../actions/product';
import { Store } from '@ngrx/store';
import { State } from '../reducers';

@Injectable()
export class ProductService {
  constructor(private db: AngularFireDatabase, private store: Store<State>) { }

  dispatchLoad() {
    this.store.dispatch(new LoadAction());
  }

  fetchProducts() {
    return this.db.list('/products');
  }

  addProduct(product) {
    return this.db.list(`/products`).push(product)
      .then(key => ({ ...product, $key: key }));
  }

  updateProduct({ oldProduct, newProduct }) {
    const { $key } = oldProduct;
    return this.db.object(`/products/${$key}`).set(newProduct)
      .then(() => ({ $key, ...newProduct }));
  }

  deleteProduct(product) {
    return this.db.object(`/products/${product.$key}`).remove()
      .then(() => true);
  }
}
