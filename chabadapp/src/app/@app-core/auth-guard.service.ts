import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { AuthService } from './http';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    // private toastr: ToastrService,
    private auth: AuthService,
    private storage: StorageService,
  ) { }

  canActivate(): Observable<boolean> {
    if (localStorage.getItem('Authorization')) {
      // this.storage.setInfoAccount(localStorage.getItem('Authorization'));
      return of(true);
    } else {
      this.router.navigateByUrl('/auth-manager/login',
       { queryParams: { returnUrl: window.location.pathname } });
      return of(false);
    }
    // const tempToken = (localStorage.getItem('token') == null) ? '' : localStorage.getItem('token').replace('Bearer ', '');
    // const objCheckToken: any = {
    //     clientTime:  new Date().getTime(),
    //     token: tempToken,
    //     sign: sha256(new Date().getTime() + tempToken + this.key)
    // };
    // return this._auth.checkToken(objCheckToken).pipe(mergeMap((data) => {
    //     return of(true)
    // }), catchError(() => { return of(false); })); 
  }



}
