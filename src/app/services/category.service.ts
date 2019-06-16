import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl, httpOptionsGet, httpOptionsAdmin } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  getAllCategory() {
    return this.http.get(apiUrl + 'getAllCategory');
  }


  createCategory(data) {
    console.log("data", data)
    let body = new FormData();
    if (data.id) {
      body.append("id", data.id);
    }
    body.append('name', data.name);
    body.append('description', data.description);
    body.append('banner_image', data.image);
    body.append('status', data.status);
    body.append('order', data.order);
    return this.http.post(apiUrl + "createCategory", body, httpOptionsAdmin);
  }

  deleteCategory(id) {
    return this.http.get(apiUrl + "deleteCategory?id=" + id, httpOptionsGet);
  }

}
