import { Component, OnInit } from '@angular/core';
import { StartService } from '../start.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent implements OnInit{
  myScore: number = -1;
constructor(private startService:StartService,private router:Router){}

playagain(){
  this.startService.start().subscribe(
    (response) => {
      if (response) {
        console.log('Game started successfully.');
        // Redirect to the submit page
        this.router.navigate(['/submit']); // Replace '/submit' with your actual route
      } else {
        console.log('Failed to start the game.');
        // Handle failure
      }
    },
    (error) => {
      console.error('An error occurred:', error);
      // Handle error
    }
  );
}
quit(){

  this.startService.quit().subscribe(
    (res)=>{
      this.router.navigate(['/startGame']);
    }
    ,(error)=>{
      this.router.navigate(['startGame']);
    }
  );
}
ngOnInit() {
  this.loadScore();
}
  loadScore() {
    this.startService.getMyScore().subscribe(
      (score) => {
        this.myScore = score;
      },
      (error) => {
        console.error('Error fetching score:', error);
      }
    );
  }
}
