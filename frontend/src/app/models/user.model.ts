export interface User {
  id?: number;
  email: string;
  password?: string;
  role: Role;
  firstName: string;
  lastName: string;
  createdAt?: Date;
  managedStore?: HardwareStore;
  owner?: User;
}

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  OWNER = 'OWNER',
  MANAGER = 'MANAGER'
}