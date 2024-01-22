import { Component, OnInit } from '@angular/core';
import { StartService } from '../start.service';
import { Router } from '@angular/router';
import { Score } from '../leaderboard.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogoutService } from '../logout.service';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnInit {
constructor(private startService:StartService,private router:Router,private logoutService:LogoutService){

}
ngOnInit() {
  // Check if userEmail is present in the session
  const userEmail = sessionStorage.getItem('userEmail');

  if (!userEmail) {
    // Redirect to login page with a message
    this.router.navigate(['/login'], { queryParams: { msg: 'Login first' } });
  }
}
start(){
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
myBestScore:Score=new Score(0,"",-1);
myBest(){
  this.startService.myBest().subscribe(
    (res)=>{
      if(res===null){
        this.myBestScore.score=-1;
        this.myBestScore.email="You Have't Played Any Match";
        setTimeout(() => {
          this.myBestScore = new Score(0,"",-1);
        },2000);}
      else{
      this.myBestScore=res;
      setTimeout(() => {
        this.myBestScore = new Score(0,"",-1);
      },2000);}
    }
    ,(error)=>
    {
      console.log(error);
    }

  )
  ;
}
logout() {
  const logoutconform=window.confirm("Are You Sure to Log Out")
  // Check if the user email exists in local storage
  if(logoutconform){
  if(sessionStorage===null){
    console.log("sessionStorage is null");
    this.router.navigateByUrl('/login'); 
  }



  const userEmail = sessionStorage.getItem('userEmail');
if(userEmail===null){
  console.log("UserEmail is null");
  this.router.navigateByUrl('/login'); 
}

  if (userEmail) {
    // User is logged in, proceed with logout
    this.logoutService.logout().subscribe(
      () => {
        // Clear user email from local storage
        sessionStorage.removeItem('userEmail');

        console.log('Logged out successfully.');
        this.router.navigateByUrl('/login'); // Use navigateByUrl for more precise navigation
      },
      error => {

        console.error('Error during logout:', error);
        // Handle error if necessary
        this.router.navigateByUrl('/login');
      }
    );
  } else {
    console.log("Use not Present")
    this.router.navigateByUrl('/login');
  }
}
}

}
