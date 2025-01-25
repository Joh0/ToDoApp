import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  userName: string = '';

  constructor(private authService: AuthService){
    this.userName = authService.name;
  }

}
