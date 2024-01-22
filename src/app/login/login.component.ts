import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login, LoginService } from '../login.service';
import { Router } from '@angular/router';
import { LogoutService } from '../logout.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router,private logoutService:LogoutService) { }

  userLogin: Login = new Login("", "");
  loginMsg = "";
  isSubmitClicked=false;
  login() {
    if (!this.userLogin.email || !this.userLogin.password) {
      this.loginMsg = "Email and Password are required";
      console.log("Email and Password are required");

      // Clear the message after 3000 milliseconds (3 seconds)
      setTimeout(() => {
        this.loginMsg = "";
      }, 1000);
      return; // Stop the registration process if email or password is missing
    }
    
    this.loginService.login(this.userLogin).subscribe(
      (res) => {
        
        if (res) {
          this.loginMsg ="Login Succesfully"
          sessionStorage.setItem('userEmail', this.userLogin.email);
          this.router.navigate(['startGame']);
        }else{
          this.loginMsg ="Login Failed"
        }
        this.setTimer();
      }, (error) => {

        this.loginMsg = "Error Occurred";
        console.log(error);
        this.setTimer();
      }
    );
  }

  setTimer() {
    setTimeout(() => {
      this.loginMsg = ""; // Clear the message after 1000ms
    }, 2000);
  }
 

 
}
