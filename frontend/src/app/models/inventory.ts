import { HardwareStore } from './hardware-store';
import { Product } from './product';

export interface Inventory {
  id?: number;
  store: HardwareStore;
  product: Product;
  quantity: number;
  lastUpdated?: Date;
}