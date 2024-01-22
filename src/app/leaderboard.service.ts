import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor(private httpClient:HttpClient) { }
  getTopScorers(): Observable<Score[]> {
    return this.httpClient.get<Score[]>("http://localhost:8080/toppers");
  }
}
export class Score {
  id: number;
  email: string;
  score: number;
  constructor(id:number,email:string,score:number){
    this.id=id;
    this.email=email;
    this.score=score;
  }
}
