import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient) { }
  login(login: Login): Observable<boolean> {
   return this.httpClient.post<boolean>('http://localhost:8080/login', login);
  }
}
export class Login{
  email:string;
  password:string;
  constructor(email:string,password:string){
    this.email=email;this.password=password;
  }

}


