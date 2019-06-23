import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderData: any;

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe((res: any) => {
      if (res.value) {
        this.orderData = res.data;
      }
    }, err => console.log(err));
  }

  editOrder(id) {
    this.router.navigate(['/orderdetails/', id])
  }

}
