import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TeaProduct } from '../models/tea-product.model';

@Injectable({
  providedIn: 'root'
})
export class TeaService {
  private apiUrl = 'https://testologia.ru/tea';

  private selectedProductSource = new BehaviorSubject<TeaProduct | null>(null);
  selectedProduct$ = this.selectedProductSource.asObservable();

  constructor(private http: HttpClient) { }

  getTeaProducts(): Observable<TeaProduct[]> {
    return this.http.get<TeaProduct[]>(this.apiUrl);
  }

  getTeaProductsByCategory(category: string): Observable<TeaProduct[]> {
    return this.http.get<TeaProduct[]>(`${this.apiUrl}?category=${category}`);
  }

  getTeaProductById(id: number): Observable<TeaProduct> {
    return this.http.get<TeaProduct>(`${this.apiUrl}/${id}`);
  }


  setSelectedProduct(product: TeaProduct): void {
    this.selectedProductSource.next(product);
  }
}
