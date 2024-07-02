import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient,private authservice:AuthService) { }
  url = 'http://localhost:8000'

  getLogin( body: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    headers.append('Accept', 'application/json');
    return this.http.post(`${this.url}/user/login`, JSON.stringify(body), {headers});
  }

  getSignup( body: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    headers.append('Accept', 'application/json');
    return this.http.post(`${this.url}/user/signup`, JSON.stringify(body), {headers});
  }

  getShortLink(uid:any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    headers.append('Accept', 'application/json');
    const body = {uid}
    console.log(JSON.stringify(body));
    return this.http.post(`${this.url}/shorturls`, body, {headers});
  }
}
