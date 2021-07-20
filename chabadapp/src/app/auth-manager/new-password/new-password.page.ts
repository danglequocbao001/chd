import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/utils';
import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
})
export class NewPasswordPage implements OnInit {
  passwordValue = '444';
  confirmedPasswordValue = '';
  
  invalidPassword = '';
  invalidConfirmedPassword = '';
  constructor(
    private pageNotiService: PageNotiService,
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService
    ) { }

  ngOnInit() {}

  clearPassword(event) {
    event.target.value = '';
    this.invalidPassword = '';
    this.invalidConfirmedPassword = '';
  }

  saveValue(event) {
    if (event.target.name == 'password') {
      this.passwordValue = event.target.value;
    } else if (event.target.name == 'confirmedPassword') {
      this.confirmedPasswordValue = event.target.value;
    }
  }

  checkValidPassword(name: string, value: string) {
    if (value == '') {
      this.loadingService.dismiss();
      return `${name} can't not be empty`;
    }
    if (value.length < 6) {
      this.loadingService.dismiss();
      return `${name} can't not be less than 6 letters`;
    }
    if (name == 'Confirmed password') {
      this.loadingService.dismiss();
      if (this.passwordValue != this.confirmedPasswordValue) {
        return 'Confirmed password not match with password';
      }
    }
    return '';
  }

  confirmPassword() {
    this.loadingService.present();
    const datapasing: IDataNoti = {
      title: 'SUCCESSFUL!',
      des: 'Change Password successful!',
      routerLink: '/main/chabad'
    }
    this.invalidPassword = this.checkValidPassword('Password', this.passwordValue);
    this.invalidConfirmedPassword = this.checkValidPassword('Confirmed password', this.confirmedPasswordValue);
    if (this.invalidPassword == '' && this.invalidConfirmedPassword == '') {
      this.loadingService.dismiss();
      this.authService.newPassword({ password: this.passwordValue }).subscribe((data) => {
        this.pageNotiService.setdataStatusNoti(datapasing);
        this.router.navigateByUrl('/page-noti');
      })
    }    
  }
}
