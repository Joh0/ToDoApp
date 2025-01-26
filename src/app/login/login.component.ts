import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  submitButtonText: string = 'Login';
  switchButtonText: string = 'Switch to Register';
  passwordButton: string = 'Show Password';
  passwordFlag: boolean = false;
  enquiryMessage: string = 'By inputting a group, you are able to view the To Do items of other members of the same group';
  enquiryMessageToggle: boolean = false;

  constructor(private authService: AuthService, private router: Router){}

  submitForm(form: NgForm){
    if(this.submitButtonText === 'Login'){
      this.loginUser(form.value);
    }
    else{
      this.registerUser(form.value);
    }
    form.reset();
  }

  switch(){
    if(this.submitButtonText === 'Login'){
      this.submitButtonText = 'Register';
      this.switchButtonText = 'Switch to Login';
    } 
    else{
      this.submitButtonText = 'Login';
      this.switchButtonText = 'Switch to Register'
    }
  }

  showHidePassword(){
    if(!this.passwordFlag){
      this.passwordFlag = true;
      this.passwordButton = 'Hide Password';
    } else{
      this.passwordFlag = false;
      this.passwordButton = 'Show Password';
    }
  }

  registerUser(user: User){
    console.log(user);
    this.authService.registerUser(user).subscribe(
      (response: { message: string}) => {
        alert(response.message);
      }, 
      (error) => { //Error is usually a large object that has an error attribute that may vary in data structure, so for simplicity we will not give it a type here.
        if(error.error.error && error.error.message){
          alert("Error: " + error.error.message);
          alert("Reason: " + error.error.error);
        }
        else{
          alert("Error: " + error.error.message);
        }
      }
    )
  }


  loginUser(userDetails: { name: string, password: string}){
    console.log(userDetails);
    this.authService.loginUser(userDetails).subscribe(
      (response) => {
        console.log(response);
        if('token' in response){
          this.authService.saveToken(response.token);
          this.authService.pushingName(response.name);
          this.authService.pushingGroup(response.group);
          console.log("Login Successful!");
          this.router.navigate(['list']);
        }
        else{
          throw Error(response.message);
        }
      },
      (error) => {
        console.log(error);
        alert(error.error.message);
      }
    )
  }

  onMouseEnter(enquiry: HTMLElement){
    enquiry.style.color = "white";
    this.enquiryMessageToggle = true;

  }

  onMouseOut(enquiry: HTMLElement){
    enquiry.style.color="black";
    this.enquiryMessageToggle = false;
  }

}
