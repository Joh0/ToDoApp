import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Item } from './models/item.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiURL = 'http://localhost:3000/api/';

  constructor(private authService: AuthService, private http: HttpClient) { }

  getListWithName(optionalParams?: { [key: string]: string | number }): Observable<{data: Item[]}>{
    let params = new HttpParams;

    if(optionalParams){
      for(const key in optionalParams){
        if(optionalParams[key] !== undefined && optionalParams[key] !== null){
          params = params.set(key, optionalParams[key].toString()); // Reassigning params because whenever it is modified, it returns a new instance and the old one remains immutable
        }
      }
    }
    console.log("Params to be provided to backend");
    console.log(params);

    return this.http.get<{data: Item[]}>(this.apiURL + 'listName/' + this.authService.name, { params }).pipe(
      catchError((error) => {
        console.error('Error:', error);  // Log the error
        return throwError(error);  // Propagate the error to the component
      })
    )
  }

  getListWithGroup(optionalParams?: { [key: string]: string | number }): Observable<{data: Item[]}>{
    let params = new HttpParams;

    if(optionalParams){
      for(const key in optionalParams){
        if(optionalParams[key] !== undefined && optionalParams[key] !== null){
          params = params.set(key, optionalParams[key].toString());
        }
      }
    }
    console.log("Params to be provided to backend");
    console.log(params);

    return this.http.get<{data: Item[]}>(this.apiURL + 'listGroup/' + this.authService.group, { params }).pipe(
      catchError((error) => {
        console.error('Error:', error);  // Log the error
        return throwError(error);  // Propagate the error to the component
      })
    )
  }

  getDeletedListWithName(): Observable<{ data: Item[] }>{
    return this.http.get<{ data: Item[] }>(this.apiURL + 'listNameDeleted/' + this.authService.name)
  }


  addItem(item: Item): Observable<{ message: string, error: string } | { message: string }>{
    return this.http.post<{ message: string, error: string } | { message: string }>(this.apiURL + 'add', item).pipe(
      catchError((error) => {
        console.log("Error: " + error);
        return throwError(error);
      })
    );
  }

  markComplete(idObject: { [ids: string]: number[]}): Observable<{ message: string, error: string } | { message: string }>{
    return this.http.put<{ message: string, error: string } | { message: string }>(this.apiURL + 'markComplete', idObject);
  }

  markActive(idObject: { [ids: string]: number[]}): Observable<{ message: string, error: string } | { message: string }>{
    return this.http.put<{ message: string, error: string } | { message: string }>(this.apiURL + 'markActive', idObject);
  }

  markDelete(idObject: { [ids: string]: number[]}): Observable<{ message: string, error: string } | { message: string }>{
    return this.http.put<{ message: string, error: string } | { message: string }>(this.apiURL + 'markDelete', idObject);
  }

  editItem(item: Item): Observable<{ message: string, error: string} | { message: string }>{
    return this.http.put<{ message: string, error: string} | { message: string }>(this.apiURL + 'edit', item);
  }

  deleteItem(idObject: { [ids: string]: number[]}): Observable<{ message: string, error: string } | { message: string }>{
    return this.http.put<{ message: string, error: string } | { message: string }>(this.apiURL + 'delete', idObject);
  }

}
