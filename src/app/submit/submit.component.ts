import { Component } from '@angular/core';
import { StartService, SubmitHelper } from '../start.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-submit',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './submit.component.html',
  styleUrl: './submit.component.css'
})
export class SubmitComponent {
  num=0;
  submitResponse:SubmitHelper=new SubmitHelper("",false); // Use the appropriate type based on your backend response

  constructor(private startService: StartService, private router: Router) { }

  submitNumber() {
    this.startService.submitNumber(this.num).subscribe(
      (response) => {
        this.submitResponse.msg = response.msg;
        if (response.input_status) {
          console.log('Number submitted successfully.');
          this.router.navigate(['/score']);
        } else {
          this.submitResponse.msg = response.msg;
          console.log('Failed to submit the number.');
        }

        // Set a timeout to clear the message after 3000 milliseconds (3 seconds)
        this.setTimer();
      },
      (error) => {
        console.error('An error occurred:', error);
       
        this.submitResponse.msg="Please Enter Number";
        this.setTimer();
      }
    );
  }

  quit(){

    const confirmQuit = window.confirm('Are you sure you want to quit?');

    if (confirmQuit) {
      
      this.startService.quit().subscribe(
      (res)=>{
        this.router.navigate(['/startGame']);
      }
      ,(error)=>{
        this.router.navigate(['startGame']);
      }
    );
  }}
  setTimer() {
    setTimeout(() => {
      this.submitResponse.msg = ""; // Clear the message
    }, 1500); // Adjust the timeout duration as needed (3000 milliseconds = 3 seconds)
  }}
