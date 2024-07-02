import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private apiservice : ApiService, private router:Router, private toast:NgToastService){}

  signupUser(userData:any){
    console.log(userData);
    if(userData.valid){
      this.apiservice.getSignup(userData).subscribe((result)=>{
        console.log(result);
        if (result && result.status === 201) {
          this.router.navigate(['/login']);
        }
      })
    }
  }
}
