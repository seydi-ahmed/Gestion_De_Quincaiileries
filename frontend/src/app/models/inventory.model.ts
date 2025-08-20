import { HardwareStore } from './hardware-store.model';
import { Product } from './product.model';

export interface Inventory {
  id?: number;
  store: HardwareStore;
  product: Product;
  quantity: number;
  lastUpdated?: Date;
}