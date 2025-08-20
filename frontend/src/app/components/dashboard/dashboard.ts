import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { User, Role } from '../../models/user';
import { HardwareStoreService } from '../../services/hardware-store';
import { InventoryService } from '../../services/inventory';
import { HardwareStore } from '../../models/hardware-store';
import { Inventory } from '../../models/inventory';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {
  currentUser: User;
  stores: HardwareStore[] = [];
  lowStockItems: Inventory[] = [];
  totalProducts: number = 0;

  constructor(
    private authService: AuthService,
    private hardwareStoreService: HardwareStoreService,
    private inventoryService: InventoryService
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    if (this.currentUser.role === Role.SUPER_ADMIN) {
      this.hardwareStoreService.getAllStores().subscribe(stores => {
        this.stores = stores;
      });
    } else if (this.currentUser.role === Role.OWNER) {
      this.hardwareStoreService.getStoresByOwnerId(this.currentUser.id!).subscribe(stores => {
        this.stores = stores;
      });
      
      this.inventoryService.getInventoryByOwnerId(this.currentUser.id!).subscribe(inventory => {
        this.totalProducts = inventory.reduce((sum, item) => sum + item.quantity, 0);
        
        // Get low stock items (quantity < 10)
        this.lowStockItems = inventory.filter(item => item.quantity < 10);
      });
    } else if (this.currentUser.role === Role.MANAGER && this.currentUser.managedStore) {
      this.inventoryService.getInventoryByStoreId(this.currentUser.managedStore.id!).subscribe(inventory => {
        this.totalProducts = inventory.reduce((sum, item) => sum + item.quantity, 0);
        
        // Get low stock items (quantity < 10)
        this.lowStockItems = inventory.filter(item => item.quantity < 10);
      });
    }
  }

  isSuperAdmin(): boolean {
    return this.authService.isSuperAdmin();
  }

  isOwner(): boolean {
    return this.authService.isOwner();
  }

  isManager(): boolean {
    return this.authService.isManager();
  }
}