import { Injectable } from '@angular/core';
import { LocalStorageService,SessionStorageService } from 'angular-web-storage';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private session:SessionStorageService, private local:LocalStorageService) {}

  setLoggedIn(value:any){
    this.session.set('loggedIn',value)
  }
  getLoggedIn(value:any){
    return this.session.get('loggedIn')
  }
  setAccessToken(value:any){
    this.local.set('access_token',value)
  }
  getAccessToken(){
    return this.local.get('access_token');
  }
  setLoginUser(value:any){
    this.local.set('loginUser',value)
  }
  getLoginUser(){
    return this.local.get('loginUser')
  }
}
