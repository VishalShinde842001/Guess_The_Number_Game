import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient:HttpClient) { }
  register(register: Register): Observable<boolean> {
    return this.httpClient.post<boolean>("http://localhost:8080/register", register);
  }

}

export class Register{
  first_name:string;
  last_name:string;
  email:string;
  password:string;
  constructor(first_name:string,last_name:string,email:string,password:string){
    this.first_name=first_name;
    this.last_name=last_name;
    this.email=email;
    this.password=password;
  }

}