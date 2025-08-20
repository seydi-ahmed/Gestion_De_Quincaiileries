import { Component, OnInit } from '@angular/core';
import { HardwareStoreService } from '../../services/hardware-store';
import { UserService } from '../../services/user';
import { AuthService } from '../../services/auth';
import { HardwareStore } from '../../models/hardware-store';
import { User, Role } from '../../models/user';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.html',
  styleUrls: ['./stores.scss']
})
export class Stores implements OnInit {
  stores: HardwareStore[] = [];
  managers: User[] = [];
  currentUser: User;
  newStore: HardwareStore = {
    name: '',
    address: '',
    phoneNumber: '',
    owner: null as any
  };
  showAddForm: boolean = false;

  constructor(
    private hardwareStoreService: HardwareStoreService,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit() {
    this.loadStores();
    this.loadManagers();
  }

  loadStores() {
    if (this.currentUser.role === Role.SUPER_ADMIN) {
      this.hardwareStoreService.getAllStores().subscribe(stores => {
        this.stores = stores;
      });
    } else if (this.currentUser.role === Role.OWNER) {
      this.hardwareStoreService.getStoresByOwnerId(this.currentUser.id!).subscribe(stores => {
        this.stores = stores;
      });
    }
  }

  loadManagers() {
    if (this.currentUser.role === Role.OWNER) {
      this.userService.getManagersByOwnerId(this.currentUser.id!).subscribe(managers => {
        this.managers = managers;
      });
    }
  }

  addStore() {
    this.newStore.owner = this.currentUser;
    this.hardwareStoreService.createStore(this.newStore).subscribe(() => {
      this.loadStores();
      this.newStore = {
        name: '',
        address: '',
        phoneNumber: '',
        owner: null as any
      };
      this.showAddForm = false;
    });
  }

  deleteStore(id: number) {
    this.hardwareStoreService.deleteStore(id).subscribe(() => {
      this.loadStores();
    });
  }

  assignManager(storeId: number, managerId: number) {
    this.hardwareStoreService.assignManager(storeId, managerId).subscribe(() => {
      this.loadStores();
    });
  }

  removeManager(storeId: number) {
    this.hardwareStoreService.removeManager(storeId).subscribe(() => {
      this.loadStores();
    });
  }

  isSuperAdmin(): boolean {
    return this.authService.isSuperAdmin();
  }

  isOwner(): boolean {
    return this.authService.isOwner();
  }
}