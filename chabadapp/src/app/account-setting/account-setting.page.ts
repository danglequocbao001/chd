import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { AccountService } from '../@app-core/http';
import { PopupComponent } from '../@modular/popup/popup.component';
import { PopuplogoutComponent } from '../@modular/popuplogout/popuplogout.component';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.page.html',
  styleUrls: ['./account-setting.page.scss'],
})
export class AccountSettingPage implements OnInit {
  isOpeningModal = false;
  name = localStorage.getItem('fullname') || '';
  constructor(
    public modalController: ModalController,
    private popoverController: PopoverController,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    
  }
  avatar:any;
  ionViewWillEnter() {
    this.accountService.getAccounts().subscribe(result => {
      if(result.app_user.avatar == null || result.app_user.avatar == '') {
        this.avatar = "https://i.imgur.com/edwXSJa.png";
      }
      else {
        this.avatar = result.app_user.avatar;
      }
    })
  }

  async openModalLogOut() {
    this.isOpeningModal = true;
    const modal = await this.modalController.create({
      component: PopuplogoutComponent,
      swipeToClose: true,
      cssClass: 'modal__logout'
    });
    await modal.present();

    modal.onWillDismiss().then(() => this.isOpeningModal = false);
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopupComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
