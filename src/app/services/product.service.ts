import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl, httpOptionsGet, httpOptionsAdmin } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProduct() {
    return this.http.get(apiUrl + 'getAllProductAdmin');
  }

  deleteProduct(id) {
    return this.http.get(apiUrl + "deleteProduct?id=" + id, httpOptionsGet);
  }

}
