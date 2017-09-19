export class Product {
  name: string;
  description: string;
  image: string;
  price: number;
  $key: string;
}

export const deletedProduct = $key => ({
  $key,
  name: 'Unknown',
  description: 'Product has been deleted',
  image: '',
  price: 0,
});
