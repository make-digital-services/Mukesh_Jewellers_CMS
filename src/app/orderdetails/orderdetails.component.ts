import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { imgUrl } from '../app.constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss']
})
export class OrderdetailsComponent implements OnInit {
  orderDetails: any;
  itemDetails: any;
  imageServer = imgUrl;
  constructor(private orderService: OrderService, private route: ActivatedRoute, private router: Router, public toastr: ToastrService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.orderService.getOrderbyId(id).subscribe((result: any) => {
      if (result.value) {
        this.orderDetails = result.data;
        this.itemDetails = result.order_items;
        console.log("orderdetails", this.orderDetails);
        console.log("item details", this.itemDetails);
      }
    }, error => {
      console.log(error.message);
    });
  }

  updateOrderStatus(data) {
    let sendData = {
      id: data.id,
      orderstatus: data.orderstatus
    }
    this.orderService.updateOrderStatus(sendData).subscribe((res: any) => {
      if (res.value) {
        this.toastr.success('Order Status Updated', 'Success');
      }
    }, err => console.log(err));
  }

}
