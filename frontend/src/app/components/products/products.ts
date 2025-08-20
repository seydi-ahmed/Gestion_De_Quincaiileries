import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { InventoryService } from '../../services/inventory';
import { AuthService } from '../../services/auth';
import { Product } from '../../models/product';
import { Inventory } from '../../models/inventory';
import { User, Role } from '../../models/user';

@Component({
  selector: 'app-products',
  templateUrl: './products.html',
  styleUrls: ['./products.scss']
})
export class Products implements OnInit {
  products: Product[] = [];
  inventories: Inventory[] = [];
  currentUser: User;
  searchText: string = '';
  selectedCategory: string = '';

  constructor(
    private productService: ProductService,
    private inventoryService: InventoryService,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit() {
    this.loadProducts();
    this.loadInventory();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  loadInventory() {
    if (this.currentUser.role === Role.SUPER_ADMIN) {
      this.inventoryService.getAllInventory().subscribe(inventories => {
        this.inventories = inventories;
      });
    } else if (this.currentUser.role === Role.OWNER) {
      this.inventoryService.getInventoryByOwnerId(this.currentUser.id!).subscribe(inventories => {
        this.inventories = inventories;
      });
    } else if (this.currentUser.role === Role.MANAGER && this.currentUser.managedStore) {
      this.inventoryService.getInventoryByStoreId(this.currentUser.managedStore.id!).subscribe(inventories => {
        this.inventories = inventories;
      });
    }
  }

  getQuantityForProduct(productId: number, storeId?: number): number {
    if (storeId) {
      const inventory = this.inventories.find(i => i.product.id === productId && i.store.id === storeId);
      return inventory ? inventory.quantity : 0;
    } else if (this.currentUser.role === Role.MANAGER && this.currentUser.managedStore) {
      const inventory = this.inventories.find(i => i.product.id === productId);
      return inventory ? inventory.quantity : 0;
    }
    return 0;
  }

  updateQuantity(productId: number, quantity: number) {
    if (this.currentUser.role === Role.MANAGER && this.currentUser.managedStore) {
      this.inventoryService.updateInventory(
        this.currentUser.managedStore.id!, 
        productId, 
        quantity
      ).subscribe(() => {
        this.loadInventory();
      });
    }
  }

  getCategories(): string[] {
    return [...new Set(this.products.map(p => p.category))];
  }

  filterProducts(): Product[] {
    return this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
                           product.reference.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  isManager(): boolean {
    return this.authService.isManager();
  }
}