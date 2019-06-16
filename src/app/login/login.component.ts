import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userData: any = {};
  constructor(private loginService: LoginService, private route: Router) { }

  ngOnInit() {
  }

  login(data) {
    console.log("daata", data)
    this.loginService.login(data).subscribe((res: any) => {
      if (res.value) {
        localStorage.setItem('userData', JSON.stringify(res.data));
        // location.href = '/dashboard';
        this.route.navigate(['dashboard']);
      }
      else {
        alert("please enter valid username and password");
      }

    }, error => console.log(error));
  }


}
