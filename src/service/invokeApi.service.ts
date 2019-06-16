import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpErrorResponse, HttpXhrBackend, HttpBackend, XhrFactory  } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpHandler, ɵHttpInterceptingHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {RootModal} from '../app/models/rootModal';


@Injectable({
  providedIn: 'root',
})
export class scrubService {
    apiUrl = 'https://ussouthcentral.services.azureml.net/workspaces/86a4021753874ee68e6ef949890b5533/services/01efe0bdf3d44a7b837c051dbcb755f5/execute?api-version=2.0&details=true';
   apiKey = "75lYrn06B2y3TdM0yeX6CQgmVVXnRmagtEIraZ4BhZNoxUr4E3DlHjGQiTFFAASjCSGqDZsgOaQhGAgoE1x5KQ==";  // URL to web api

  constructor(
    private http: HttpClient) {
  }

calltheAPI(request: RootModal): Observable<any> {

  const injector = Injector.create({
    providers: [
        { provide: HttpClient, deps: [HttpHandler] },
        { provide: HttpHandler, useValue: new HttpXhrBackend({ build: () => new XMLHttpRequest }) },
    ],
});
const httpClient: HttpClient = injector.get(HttpClient);

    const headers = new HttpHeaders;
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', 'Bearer' + this.apiKey)

    headers.set('Access-Control-Allow-Origin', 'http://localhost:4200');
headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    let httpHandlers: HttpHandler;
    this.http = new HttpClient(httpHandlers);
    //return this.http.request(new HttpRequest("POST", this.apiUrl, {headers: headers}));
    return httpClient.post(this.apiUrl, request,  { headers: headers })
  }

}
