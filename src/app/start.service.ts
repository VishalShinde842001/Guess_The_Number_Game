import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Score } from './leaderboard.service';

@Injectable({
  providedIn: 'root'
})
export class StartService {

  constructor(private httpClient:HttpClient) { }
  start(): Observable<boolean> {
    
    return this.httpClient.get<boolean>('http://localhost:8080/start');
  }

  submitNumber(num: number): Observable<SubmitHelper> {
   
    return this.httpClient.get<SubmitHelper>("http://localhost:8080/submit/"+num);
  }
  getMyScore(): Observable<number> {
    return this.httpClient.get<number>("http://localhost:8080/score");
  }
  myBest():Observable<Score>{
    return this.httpClient.get<Score>("http://localhost:8080/myTop");
  }
  quit():Observable<boolean>{
   return this.httpClient.get<boolean>("http://localhost:8080/quit");
  }
}
// submit-helper.model.ts

export class SubmitHelper {
  msg: string;
  input_status: boolean;
  constructor(msg:string,input_status:boolean){
    this.msg=msg;
    this.input_status=input_status;
  }
}

