import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AccountService, AuthService } from 'src/app/@app-core/http';
import { LoadingService, ToastService } from 'src/app/@app-core/utils';
import { IDataNoti, PageNotiService } from '../page-noti/page-noti.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  formSubmit: FormGroup;
  check = false;
  message = '';
  checkpn = false;
  messagepn = '';
  constructor(private formBuilder: FormBuilder,
    private pageNotiService: PageNotiService,
    private router: Router,
    private AccoutnService: AccountService,
    private loadService: LoadingService,
    private ToasService: ToastService,
    private passwordModal: ModalController,
    private authService: AuthService) { 
    this.formSubmit = this.formBuilder.group({
      passwordcurrent: new FormControl('', Validators.required),
      passwordnew: new FormControl('', Validators.required),
      passwordconfirm: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
  }
  async openModal(ev: any) {
    const popover = await this.passwordModal.create({
     component: ChangepasswordPage,
       cssClass: 'modalPassword',
    });
    return await popover.present();
  }
  dismissModal() {
    this.passwordModal.dismiss();
  }
  onSubmit() {
    const cp = this.formSubmit.value.passwordcurrent;
    const pn = this.formSubmit.value.passwordnew;
    const pc = this.formSubmit.value.passwordconfirm;
    if (cp.length < 6) {
      this.messagepn = 'Min password is 6'
    }
    if(pn.length < 6){
        this.checkpn = true;
        this.messagepn = 'Min password is 6'
    }
    else if(pn !=  pc) {
      this.check = true;
      this.checkpn = false;
      this.message = 'Password not match !'
    }
    else {
      this.check = false;
      const datapasing: IDataNoti = {
        title: 'SUCCESSFUL!',
        des: 'Change Password successful!',
        routerLink: '/main/chabad'
      }
      var ps = {
        "current_password":cp,
        "new_password": pn,
        "new_password_confirmation":pc
      }
      this.loadService.present()
      this.dismissModal() 
      this.AccoutnService.changePass(ps).subscribe(data=> {
        this.pageNotiService.setdataStatusNoti(datapasing);
        this.router.navigateByUrl('/page-noti');
        this.loadService.dismiss();
      },
      (data=>{
        
        this.loadService.dismiss();
        this.ToasService.present("Current Password Fail!")
      })
      )
    }
   
  }
  
}
