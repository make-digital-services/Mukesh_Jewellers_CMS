import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl, httpOptionsGet, httpOptionsPost } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }

  getAllOrders() {
    return this.http.get(apiUrl + 'getAllOrders');
  }

  getOrderbyId(id) {
    return this.http.get(apiUrl + 'getOrderbyId?id=' + id);
  }

  updateOrderStatus(data) {
    return this.http.post(apiUrl + "updateOrderStatus", JSON.stringify(data), httpOptionsPost);
  }

}
