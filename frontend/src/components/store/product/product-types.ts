export interface IProductState {
  products: ProductProps[];
  orderedProducts: OrderProductProps[];
}

export type ProductProps = {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
};

export type OrderProductProps = {
  amount: number;
  product: ProductProps;
};
