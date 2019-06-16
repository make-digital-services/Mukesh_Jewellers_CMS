import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private appService: AppService, private loginService: LoginService, private router: Router) { }
  isCollapsed = true;
  ngOnInit() {
  }

  toggleSidebarPin() {
    this.appService.toggleSidebarPin();
  }
  toggleSidebar() {
    this.appService.toggleSidebar();
  }

  logout() {
    this.loginService.logout().subscribe((res: any) => {
      if (res.value) {
        localStorage.removeItem("userData");
        this.router.navigateByUrl("/login");
        // location.href="/login";
      }
    }, err => console.log(err));
  }

}
