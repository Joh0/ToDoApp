import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  message: string = "Please Sign In";


  constructor(private authService: AuthService, private router: Router){
    this.authService.nameObservable$.subscribe(
      (nameString) => {
        this.message = "Welcome, " + nameString;
      }
    )
  }

  ngOnInit(){
    this.message = "Please Sign In";
  }

  logOut(){
    this.authService.logout();
    alert("Log Out Successful!")
    this.message = "Please Sign In";
    this.router.navigate(['login']);
  }

}
