import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService, private router: Router){
  }

  canActivate(){
    if(this.authService.isLoggedIn()){
      console.log("AuthGuard: Access granted.");
      return true;
    }
    console.log("AuthGuard: Redirecting to Login Page...");
    alert("Please sign in!");
    this.router.navigate(['/login']);
    return false;
  }
}



