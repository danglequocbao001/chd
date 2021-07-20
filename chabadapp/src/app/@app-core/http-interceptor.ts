import { Observable, throwError } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
// import { API_URL } from './config/api';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { APICONFIG, API_URL } from './http/@http-config';

@Injectable()
export class IntercepterService implements HttpInterceptor {
  number=0;

  constructor(
    @Inject(API_URL) private apiUrl: string,
    private router: Router,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var request = req.clone({
      url: this.prepareUrl(req.url)

    });
    if (localStorage.getItem('Authorization') !== null) {
      request = req.clone({
        url: this.prepareUrl(req.url),
        // withCredentials: false,
        headers: req.headers.set('Authorization', localStorage.getItem('Authorization') || '').set('Accept', 'multipart/form-data'),
      });
    }
    else {

    }

    return next.handle(request)
      .pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
             this.number++;
             if(this.number>2)
              {
               this.router.navigateByUrl('/auth/login', { queryParams: { returnUrl: window.location.pathname } });
               localStorage.clear();
              }
              return throwError(err);

            }
            if(err.status === 422)
            {
              return throwError(err);
            }
            
          }
          return throwError(err);
        }));
  }

  private isAbsoluteUrl(url: string): boolean {
    const absolutePattern = /^https?:\/\//i;
    return absolutePattern.test(url);
  }

  private prepareUrl(url: string): string {
    url = this.isAbsoluteUrl(url) ? url : this.apiUrl + url;
    return url.replace(/([^:]\/)\/+/g, '$1');
  }
}

