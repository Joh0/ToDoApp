import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = 'http://localhost:3000/api/';

  name: any = null;
  group: any = null;

  // For header to subscribe
  private nameEmitter = new BehaviorSubject<any>(null);
  nameObservable$ = this.nameEmitter.asObservable();
  private groupEmitter = new BehaviorSubject<any>(null);
  groupObservable$ = this.groupEmitter.asObservable();

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<{ message: string } | { message: string, error: string }>{
    return this.http.post<{ message: string } | { message: string, error: string }>(this.apiURL + 'register', user)
    .pipe(
      catchError((error) => {
        console.error('Error:', error);  // Log the error
        return throwError(error);  // Propagate the error to the component
      })
    )
  }

  loginUser(userDetails: { name: string, password: string }): Observable<{ token: string, name: string, group: string } | { message: string, error: string } | { message: string }>{
    return this.http.post<{ token: string, name: string, group: string } | { message: string, error: string } | { message: string }>(this.apiURL + 'login', userDetails);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.name = null;
    this.group = null;
  }

  //Getting user details from LoginComponent
  pushingName(name: string){
    console.log("Name pushed: " + name);
    this.name = name;
    this.nameEmitter.next(name);
  }
  pushingGroup(group: string){
    console.log("Group pushed: " + group);
    this.group = group;
    this.groupEmitter.next(group);
  }
  
}
