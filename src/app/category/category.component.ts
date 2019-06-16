import {
  Component,
  OnInit
} from '@angular/core';
import {
  CategoryService
} from '../services/category.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryData: any;
  formData: any = {};
  showForm: boolean = false;
  isEdit: boolean = false;
  imageName: any;
  image: any;
  constructor(private categoryService: CategoryService, public toastr: ToastrService) { }

  ngOnInit() {
    this.getAllCAtegory();
  }

  addCategory() {
    this.isEdit = false;
    this.formData = {};
    this.image = "";
    this.showForm = !this.showForm;
  }

  editCategory(data) {
    this.formData = data;
    this.isEdit = true;
    this.showForm = true;
  }

  getAllCAtegory() {
    this.categoryService.getAllCategory().subscribe((res: any) => {
      if (res.value) {
        this.categoryData = res.data;
      }
    }, err => console.log(err));
  }

  onFileChange(fileInput: any) {
    let files = fileInput.srcElement.files;
    this.imageName = files[0].name;
    this.image = files[0];
  }

  submitCategory(data) {
    data['image'] = this.image;
    this.categoryService.createCategory(data).subscribe((res: any) => {
      if (res.value) {
        this.toastr.success('Category Added!', 'Success');
        this.getAllCAtegory();
        this.formData = {};
        this.showForm = false;
        this.isEdit = false;
        this.image = "";
      } else {
        this.toastr.error('Something Went Wrong!', 'Error');
      }
    }, err => console.log(err));
  }


  deleteCategory(data) {
    if (data) {
      let id = data.id
      this.categoryService.deleteCategory(id).subscribe((res: any) => {
        if (res.value) {
          this.toastr.success('Category Deleted!', 'Success');
          this.getAllCAtegory();
        }
      });
    }
  }
}
