import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  navigationData: any;
  formData: any = {};
  showForm: boolean = false;
  isEdit: boolean = false;
  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
    this.getNavigation();
  }

  getNavigation() {
    this.navigationService.getNavigation().subscribe((res: any) => {
      if (res.value) {
        this.navigationData = res.data;
      }
    }, err => console.log(err));
  }

}
