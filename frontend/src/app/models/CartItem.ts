export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  Product: Product;
  User: User;
}
