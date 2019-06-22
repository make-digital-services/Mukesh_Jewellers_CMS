import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl, httpOptionsGet, httpOptionsAdmin } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getContact() {
    return this.http.get(apiUrl + 'getContact');
  }

  deleteContact(id) {
    return this.http.get(apiUrl + "deleteContact?id=" + id, httpOptionsGet);
  }
}
