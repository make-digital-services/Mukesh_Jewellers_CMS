import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productData: any;
  formData: any = {};
  showForm: boolean = false;
  isEdit: boolean = false;
  imageName: any;
  image: any;
  constructor(private productService: ProductService, public toastr: ToastrService) { }

  ngOnInit() {
    this.getAllProduct();
  }

  addProduct() {
    this.isEdit = false;
    this.formData = {};
    this.image = "";
    this.showForm = !this.showForm;
  }

  editProduct(data) {
    this.formData = data;
    this.isEdit = true;
    this.showForm = true;
  }


  getAllProduct() {
    this.productService.getAllProduct().subscribe((res: any) => {
      if (res.value) {
        this.productData = res.data;
      }
    }, err => console.log(err));
  }

  deleteProduct(data) {
    if (data) {
      let id = data.id
      this.productService.deleteProduct(id).subscribe((res: any) => {
        if (res.value) {
          this.toastr.success('Product Deleted!', 'Success');
          this.getAllProduct();
        }
      });
    }
  }
}
