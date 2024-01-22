import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private httpClient:HttpClient) { }
  logout():Observable<boolean>{
    return this.httpClient.get<boolean>("http://localhost:8080/logout");
  }
}
