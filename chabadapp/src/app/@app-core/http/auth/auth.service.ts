import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG } from '../@http-config/api';
import { catchError, map } from 'rxjs/operators';
// import { ToastrService } from 'ngx-toastr';
// import { SUCCESS } from '../@http-config/messages';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/@app-core/storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { LoadingService, ToastService } from '../../utils';
import { AccountService } from '../account';

@Injectable()
export class AuthService {
  private data: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    // private toastr: ToastrService,
    private router: Router,
    private storage: StorageService,
    public toastController: ToastController,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private accountService: AccountService
  ) { }

  public get receiveData(): Observable<any> {
    return this.data.asObservable();
  }
  public sendData(value: any) {
    this.data.next(value);
  }
  public forgotPassword(req) {
    // return this.http.post(`${APICONFIG.AUTH.RESET_PASSWORD_EMAIL}`, req).pipe(
    //   map((result: any) => {
    //     console.log("ok");
        
    //     return result;
    //   }),
    //   catchError((errorRes: any) => {
    //     console.log("np");
        
    //     this.toastService.present(errorRes.error.messages[0]);
    //     this.loadingService.dismiss();
    //     throw errorRes.error;
    //   }));
    return this.http.post(`${APICONFIG.AUTH.RESET_PASSWORD_EMAIL}`, req).pipe(
      map((result: any) => {
       
        return result;
      }),
      catchError((errorRes: any) => {
       
        throw errorRes.error;
      })
    );

  }
  public checkcodePassword(req) {
    return this.http.post(`${APICONFIG.AUTH.CHECK_CODE_RESET}`, req).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
       
        throw errorRes.error;
      }
      ));
  }
  public newPassword(req) {
    return this.http.post(`${APICONFIG.AUTH.RESET_PASSWORD}`, req).pipe(
      map((result) => {
        this.setLocalStoredata();
        return result;
      }),
      catchError((errorRes: any) => {
        this.toastService.present(errorRes.error.errors, 'top')
        throw errorRes.error;
      }
      ));
  }
   public setLocalStoredata() {
    this.accountService.getAccounts().subscribe(result => {
      
      localStorage.setItem('full_name', result.app_user.full_name);
      localStorage.setItem('email',result.app_user.email) 
      if(result.app_user.avatar == null) {
        result.app_user['avatar'] = "https://i.imgur.com/edwXSJa.png";
        localStorage.setItem('avatar', result.app_user.avatar);
      }
      else {
        localStorage.setItem('avatar', result.app_user.avatar);
      }
    });
  }
  public resetPassword(req) {
    return this.http.post(`${APICONFIG.AUTH.RESET_PASSWORD}`, req).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }
      ));
  }
  public login(req) {
    return this.http.post(`${APICONFIG.AUTH.LOGIN}`, req).pipe(
      map((result: any) => {
        this.storage.clear();
        localStorage.setItem('Authorization', result.token);
        localStorage.setItem('fullname', result.full_name);
        this.storage.setInfoAccount();
        //  this.toastr.success(SUCCESS.AUTH.LOGIN);
        return result;
      }),
      catchError((errorRes: any) => {
        localStorage.clear();
        this.storage.clear();
        this.presentToast('Password or Email is invalid!');
        throw errorRes.error;
      })
      );
  }
 
  logout() {
    localStorage.clear();
    this.storage.clear();
    this.storage.setInfoAccount();
    //  this.router.navigateByUrl('/auth/login');
    window.location.assign('/');
  }
  public signup(req) {
    return this.http.post(`${APICONFIG.AUTH.SIGNUP}`, req).pipe(
      
      map((result: any) => {
        // this.toastr.success(SUCCESS.AUTH.LOGIN);
        localStorage.setItem('Authorization', result.token);
        localStorage.setItem('fullname', result.full_name);
        this.router.navigate(['main/chabad']);
        return result;
      }),
      catchError((errorRes: any) => {
        this.presentToast(errorRes.error);
        throw errorRes.error;
      }));
  }

  public countryCode() {
    return this.http.get(`${APICONFIG.AUTH.COUNTRY_CODE}`).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }))
  }
 
  checkLogin() {
    const token = localStorage.getItem('Authorization');
    if (!token) {
      return false;
    } else {
      return true;
    }
  }
  private setLocalStore(data) {
    localStorage.setItem('Authorization', data.token);
    localStorage.setItem('fullname', data.fullname);
    localStorage.setItem('exp', data.exp);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }
}
