import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor( private toast:NgToastService , private apiservice: ApiService, private authservice : AuthService, private router: Router) {}
  invalidUser: boolean = false;
  invalidMessage: any;
  loginUser(userData: NgForm) {
    try {
      console.log(userData.valid);
      if (userData.valid) {
        this.apiservice.getLogin(userData.value).subscribe({
          next: (result: any) => {
            console.log(JSON.stringify(result));
            if (result.status === 200) { // Check if login is successful based on your API response
              this.invalidUser = false;
              this.authservice.setAccessToken(result.uid);
              this.authservice.setLoggedIn(true);
              this.authservice.setLoginUser(result.data)
              this.router.navigate(['/shortner']);
            }
            
          },
          error: (err) => {
            console.error('Error during login:', err.error.status);
            if(err.status === 404){
              this.invalidUser = true
              this.invalidMessage = err.error.status
            }
            if(err.status === 401){
              console.log(err);
              this.invalidUser = true;
              const xerror = err.error
              this.invalidMessage = xerror.error;
            }
          }
          
        });
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      this.invalidUser = true;
      this.invalidMessage = 'An unexpected error occurred. Please try again later.';
    }
  }
}
