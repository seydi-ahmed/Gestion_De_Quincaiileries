export interface Product {
  id?: number;
  name: string;
  description: string;
  reference: string;
  category: string;
  price: number;
  createdAt?: Date;
}