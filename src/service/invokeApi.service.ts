
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {RootModal} from '../app/models/rootModal';
import { post } from '../../node_modules/@types/selenium-webdriver/http';

@Injectable({
  providedIn: 'root',
})
export class scrubService {
    apiUrl = 'https://ussouthcentral.services.azureml.net/workspaces/86a4021753874ee68e6ef949890b5533/services/01efe0bdf3d44a7b837c051dbcb755f5/execute?api-version=2.0&details=true';
   apiKey = "75lYrn06B2y3TdM0yeX6CQgmVVXnRmagtEIraZ4BhZNoxUr4E3DlHjGQiTFFAASjCSGqDZsgOaQhGAgoE1x5KQ== ";  // URL to web api

  constructor(
    private http: HttpClient) {
  }

calltheAPI(request: RootModal): Observable<any> {
    const headers = new HttpHeaders;
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', 'Bearer' + this.apiKey)
    
    //let httpHandlers: HttpHandler;
    //this.http = new HttpClient(httpHandlers);
    //return this.http.request(new HttpRequest("POST", this.apiUrl, {headers: headers}));
    return this.http.post(this.apiUrl, request,  { headers: headers })
  }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // };
}