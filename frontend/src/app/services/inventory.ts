import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from '../models/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private http: HttpClient) { }

  getAllInventory(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>('/api/inventory');
  }

  getInventoryByStoreId(storeId: number): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`/api/inventory/store/${storeId}`);
  }

  getInventoryByOwnerId(ownerId: number): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`/api/inventory/owner/${ownerId}`);
  }

  getInventoryByStoreAndProduct(storeId: number, productId: number): Observable<Inventory> {
    return this.http.get<Inventory>(`/api/inventory/store/${storeId}/product/${productId}`);
  }

  getLowStockItems(storeId: number, threshold: number): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`/api/inventory/store/${storeId}/low-stock?threshold=${threshold}`);
  }

  updateInventory(storeId: number, productId: number, quantity: number): Observable<Inventory> {
    return this.http.put<Inventory>(`/api/inventory/store/${storeId}/product/${productId}?quantity=${quantity}`, {});
  }

  transferInventory(fromStoreId: number, toStoreId: number, productId: number, quantity: number): Observable<any> {
    return this.http.post(`/api/inventory/transfer?fromStoreId=${fromStoreId}&toStoreId=${toStoreId}&productId=${productId}&quantity=${quantity}`, {});
  }
}