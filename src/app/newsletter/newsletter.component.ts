import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

  contactData: any;
  formData = {};
  showForm: boolean = false;
  constructor(private contactService: ContactService, public toastr: ToastrService) { }

  ngOnInit() {
    this.getAllNewsletter();
  }

  getAllNewsletter() {
    this.contactService.getSubscribe().subscribe((res: any) => {
      if (res.value) {
        this.contactData = res.data;
      }
    }, err => console.log(err));
  }


}
