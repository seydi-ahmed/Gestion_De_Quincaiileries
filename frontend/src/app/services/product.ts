import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`/api/products/${id}`);
  }

  getProductByReference(reference: string): Observable<Product> {
    return this.http.get<Product>(`/api/products/reference/${reference}`);
  }

  searchProductsByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`/api/products/search?name=${name}`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`/api/products/category/${category}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('/api/products', product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`/api/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`/api/products/${id}`);
  }
}