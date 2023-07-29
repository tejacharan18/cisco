import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface data{
  createdAt:string;
  product_name:string;
  product_image:string;
  product_type:string;
  cost:string;
  description:string;
  product_material:string;
  product:string;
  id:string;
}
@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(public http:HttpClient) { }
  headers = new HttpHeaders({
    'content-type': 'application/json',
    Authentication: 'Bearer' + localStorage.getItem('token'),
  });
private apiUrl='https://64a686f7096b3f0fcc7ff71c.mockapi.io/sample-angular-app/products'
  loadProductList(){
    return this.http.get<any>('https://64a686f7096b3f0fcc7ff71c.mockapi.io/sample-angular-app/products');
  }
  add(details:data){
    return this.http.post<any>('https://64a686f7096b3f0fcc7ff71c.mockapi.io/sample-angular-app/products',details,{headers:this.headers}); 
  }
  getProductById(productId: string): Observable<data> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<data>(url);
  }
  
  updateProduct(updatedProduct: data): Observable<data> {
    const url = `${this.apiUrl}/${updatedProduct.id}`;
    return this.http.put<data>(url, updatedProduct, { headers: this.headers });
  }
  deleteProductById(productId: string): Observable<void> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete<void>(url);
  }
} 