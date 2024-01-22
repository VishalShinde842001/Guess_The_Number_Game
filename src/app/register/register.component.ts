import { Component } from '@angular/core';
import { Register, RegisterService } from '../register.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerUser: Register = new Register("", "", "", "");
  registerMsg = "";
  constructor(private registerService: RegisterService) {}

  register() {
    if (!this.registerUser.email || !this.registerUser.password) {
      this.registerMsg = "Email and Password are required";
      console.log("Email and Password are required");

      // Clear the message after 3000 milliseconds (3 seconds)
      setTimeout(() => {
        this.registerMsg = "";
      }, 1000);
      return; // Stop the registration process if email or password is missing
    }
    this.registerService.register(this.registerUser).subscribe(
      (res) => {
        if (res == true) {
          this.registerMsg = "Registered Successfully";
          console.log("Registered");
          
          // Clear the message after 3000 milliseconds (3 seconds)
          setTimeout(() => {
            this.registerMsg = "";
          }, 1000);
        } else {
          this.registerMsg = "Not Registered";
          console.log("Not Registered");

          // Clear the message after 3000 milliseconds (3 seconds)
          setTimeout(() => {
            this.registerMsg = "";
          }, 1000);
        }
      },
      (error) => {
        this.registerMsg = "Error Occurred";
        console.log("Error" + error);

        // Clear the message after 3000 milliseconds (3 seconds)
        setTimeout(() => {
          this.registerMsg = "";
        }, 1000);
      }
    );
  }
}
