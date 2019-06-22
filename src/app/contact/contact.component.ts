import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactData: any;
  formData = {};
  showForm: boolean = false;
  constructor(private contactService: ContactService, public toastr: ToastrService) { }

  ngOnInit() {
    this.getAllContact();
  }

  getAllContact() {
    this.contactService.getContact().subscribe((res: any) => {
      if (res.value) {
        this.contactData = res.data;
      }
    }, err => console.log(err));
  }

  editContact(data) {
    this.formData = data;
    this.showForm = true;
  }

  deleteContact(id) {
    this.contactService.deleteContact(id).subscribe((res: any) => {
      if (res.value) {
        this.toastr.success('Category Deleted!', 'Success');
        this.getAllContact();
      }
    }, err => console.log(err));
  }

}
