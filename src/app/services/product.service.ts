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
  getProductById(id) {
    return this.http.get(apiUrl + "getProductById?id=" + id, httpOptionsGet);
  }

  submitProduct(data) {
    console.log("data", data)
    let body = new FormData();
    if (data.id) {
      body.append("id", data.id);
    }
    body.append('name', data.name);
    body.append('description', data.description);
    // body.append('image', data.image);
    if (data && data.image) {
      for (let i = 0; i < data.image.length; i++) {
        body.append("image_name[]", data.image[i], data.image[i]['name']);
      }
    }
    body.append('status', data.status);
    body.append('category', data.category);
    body.append('order', data.order);
    body.append('price', data.price);
    body.append('discount', data.discount);
    body.append('final_price', data.final_price);
    body.append('quantity', data.quantity);
    body.append('metatitle', data.metatitle);
    body.append('metadesc', data.metadesc);
    body.append('metakeyword', data.metakeyword);
    if (data.relatedProduct && data.relatedProduct.length > 0) {
      body.append('realated', JSON.stringify(data.relatedProduct));
    }
    return this.http.post(apiUrl + "createProduct", body, httpOptionsAdmin);
  }

  deleteProductImage(id) {
    return this.http.get(apiUrl + "deleteProductImage?id=" + id, httpOptionsGet);
  }

}
