import { Injectable } from '@angular/core';
import {
  HttpParams,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpWrapperService {
  options = {};

  constructor(private http: HttpClient) {
    if (!environment.production) {
      this.options = {
        // withCredentials: true
      };
    }
  }

  postData(data) {
    return this.http
      .post(environment.API_BASE + data.url, data.body, this.options)
      .pipe(catchError(this.handleError.bind(this)));
  }

  putData(data) {
    return this.http
      .put(environment.API_BASE + data.url, data.body, this.options)
      .pipe(catchError(this.handleError.bind(this)));
  }

  fetchData(data) {
    let params = new HttpParams();
    for (const key of Object.keys(data.params ? data.params : {})) {
      params = params.append(key.toString(), data.params[key]);
    }
    return this.http
      .get(environment.API_BASE + data.url, { params, ...this.options })
      .pipe(catchError(this.handleError.bind(this)));
  }

  private handleError(error: HttpErrorResponse | any) {
    return throwError(error);
  }
}
