import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

import { LogoutService } from './logout.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'guess_the_number';
  constructor(private logoutService:LogoutService,private router:Router){}
  isRegistrationPage(): boolean {
    return this.router.url.includes('register');
  }
  isLoginPage(): boolean {
    return this.router.url.includes('register');
  }
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
  logout() {
    if(sessionStorage===null){
      console.log("sessionStorage is null");
      this.router.navigateByUrl('/login'); 
    }
  

  
    const userEmail = sessionStorage.getItem('userEmail');
  if(userEmail===null){
    console.log("UserEmail is null");
    this.router.navigateByUrl('/login'); 
  }
   const confo=window.confirm("Are You Sure to Log Out");
   if(confo){
   

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

