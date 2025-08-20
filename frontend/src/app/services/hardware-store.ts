import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HardwareStore } from '../models/hardware-store';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class HardwareStoreService {
  constructor(private http: HttpClient) { }

  getAllStores(): Observable<HardwareStore[]> {
    return this.http.get<HardwareStore[]>('/api/stores');
  }

  getStoresByOwnerId(ownerId: number): Observable<HardwareStore[]> {
    return this.http.get<HardwareStore[]>(`/api/stores/owner/${ownerId}`);
  }

  getStoreById(id: number): Observable<HardwareStore> {
    return this.http.get<HardwareStore>(`/api/stores/${id}`);
  }

  createStore(store: HardwareStore): Observable<HardwareStore> {
    return this.http.post<HardwareStore>('/api/stores', store);
  }

  updateStore(id: number, store: HardwareStore): Observable<HardwareStore> {
    return this.http.put<HardwareStore>(`/api/stores/${id}`, store);
  }

  deleteStore(id: number): Observable<any> {
    return this.http.delete(`/api/stores/${id}`);
  }

  assignManager(storeId: number, managerId: number): Observable<HardwareStore> {
    return this.http.post<HardwareStore>(`/api/stores/${storeId}/assign-manager/${managerId}`, {});
  }

  removeManager(storeId: number): Observable<HardwareStore> {
    return this.http.post<HardwareStore>(`/api/stores/${storeId}/remove-manager`, {});
  }
}