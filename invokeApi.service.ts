
import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpErrorResponse, HttpXhrBackend, HttpBackend, XhrFactory  } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpHandler, ɵHttpInterceptingHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {RootModal} from '../app/models/rootModal';
import {Inputs} from '../app/models/Inputs';
import { Input } from '@angular/compiler/src/core';




@Injectable({
  providedIn: 'root',
})
export class scrubService {
    apiUrl = 'https://ussouthcentral.services.azureml.net/workspaces/86a4021753874ee68e6ef949890b5533/services/01efe0bdf3d44a7b837c051dbcb755f5/execute?api-version=2.0&details=true';
   apiKey = "75lYrn06B2y3TdM0yeX6CQgmVVXnRmagtEIraZ4BhZNoxUr4E3DlHjGQiTFFAASjCSGqDZsgOaQhGAgoE1x5KQ==";  // URL to web api



  constructor(
    private http: HttpClient) {
  }

calltheAPI(request: Inputs): Observable<any> {

  const injector = Injector.create({
    providers: [
        { provide: HttpClient, deps: [HttpHandler] },
        { provide: HttpHandler, useValue: new HttpXhrBackend({ build: () => new XMLHttpRequest }) },
    ],
});
const httpClient: HttpClient = injector.get(HttpClient);

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer' + ' ' +  this.apiKey
  })
};
console.log(httpOptions.headers.get("Authorization"));


    let httpHandlers: HttpHandler;
    this.http = new HttpClient(httpHandlers);
    //return this.http.request(new HttpRequest("POST", this.apiUrl, {headers: headers}));
    return httpClient.post(this.apiUrl, request,  httpOptions)
  }

}
