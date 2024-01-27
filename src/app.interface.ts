/* eslint-disable prettier/prettier */
export interface UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface ProductLineModel {
  id: string;
  quantity: string;
  orderId: string;
  productId: string;
  order: OrderModel;
  product: ProductModel;
}

export interface ProductModel {
  id: string;
  name: string;
  stock: number;
  price: number;
}

export interface OrderModel {
  id: string;
  userId: string;
  user: UserModel;
  productLines: ProductLineModel[];
}

export interface LoginModel {
  username: string;
  password: string;
}
