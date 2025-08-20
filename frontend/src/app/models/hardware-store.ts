import { User } from './user';

export interface HardwareStore {
  id?: number;
  name: string;
  address: string;
  phoneNumber: string;
  createdAt?: Date;
  owner: User;
  manager?: User;
  isActive?: boolean;
}