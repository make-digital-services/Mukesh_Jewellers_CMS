import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../services/category.service';
import { imgUrl } from '../app.constants';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  selectedProducts: any = [];
  serverImage = imgUrl;
  productData: any;
  formData: any = {};
  showForm: boolean = false;
  isEdit: boolean = false;
  imageName: any;
  image: any;
  productImages: any;
  categoryData: any;
  constructor(private productService: ProductService, private categoryService: CategoryService, public toastr: ToastrService) { }

  ngOnInit() {
    this.getAllProduct();
    this.getAllCategory();
  }

  addProduct() {
    this.isEdit = false;
    this.formData = {};
    this.image = "";
    this.showForm = !this.showForm;
  }

  onFileChange(fileInput: any) {
    this.imageName = [];
    let files = fileInput.srcElement.files;
    for (let i = 0; i < files.length; i++) {
      this.imageName.push(files[i]);
    }
    this.image = files;
  }

  editProduct(data) {
    // this.formData = data;

    this.productService.getProductById(data.id).subscribe((res: any) => {
      if (res.value) {
        this.formData = res.data;
        this.productImages = res.images;
        // this.selectedProducts = res.realated_product;
        this.isEdit = true;
        this.showForm = true;
      }
    }, err => console.log(err));
  }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe((res: any) => {
      if (res.value) {
        this.categoryData = res.data;
      }
    }, err => console.log(err));
  }

  getAllProduct() {
    this.productService.getAllProduct().subscribe((res: any) => {
      if (res.value) {
        this.productData = res.data;
      }
    }, err => console.log(err));
  }



  submitProduct(data) {
    this.formData.image = this.imageName;
    this.formData.relatedProduct = this.selectedProducts;
    this.productService.submitProduct(data).subscribe((res: any) => {
      if (res.value) {
        this.formData = {};
        this.isEdit = false;
        this.showForm = false;
        this.toastr.success(res.message, 'Success');
      } else {
        this.toastr.success(res.message, 'Warning');
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

  deleteImage(id) {
    this.productService.deleteProductImage(id).subscribe((res: any) => {
      if (res.value) {
        this.toastr.success('Product Image Deleted!', 'Success');
        this.productImages.splice(this.productImages.findIndex(i => i.id == id), 1);
      }
    });
  }

  remove(item) {
    let fIndex = this.selectedProducts && this.selectedProducts.length > 0 ? this.selectedProducts.findIndex(i => item.id == i) : -1;
    if (fIndex != -1) {
      this.selectedProducts.splice(fIndex, 1);
    }
    console.log("aaaaa", item, this.selectedProducts);
  }

  setSelectedRelatedProducts(item) {
    let fIndex = this.selectedProducts && this.selectedProducts.length > 0 ? this.selectedProducts.findIndex(i => item.id == i) : -1;
    if (fIndex == -1) {
      this.selectedProducts.push(item.id);
    }
  }
}
