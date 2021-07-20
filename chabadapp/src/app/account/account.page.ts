import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, PopoverController, AlertController } from '@ionic/angular';
import { AccountService, PATTERN } from '../@app-core/http';
import { PopupComponent } from '../@modular/popup/popup.component';
import { LoadingService, ToastService } from '../@app-core/utils';
import { ChangepasswordPage } from '../@modular/changepassword/changepassword.page';
import { CameraService } from '../@app-core/utils/camera.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  image_avatar: any;
  avatar = '';
  headerCustom = { title: 'Thông tin cá nhân' };
  activatedInput = false;
  loadedData = false;
  form: FormGroup;

  lastForm = {};
  isUpdating = false;

  validationMessages = {
    full_name: [
      { type: 'required', message: 'Name is required.' }
    ],
    phone_number: [
      { type: 'required', message: 'Phone number is required.' },
      { type: 'pattern', message: 'Phone number is invalid.' },
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Email is invalid.' },
    ],
    // full_address: [
    //   { type: 'required', message: 'Address is required.' }
    // ]
  }

  constructor(
    private fb: FormBuilder,
    public popoverController: PopoverController,
    private accountService: AccountService,
    private passwordModal: ModalController,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private alertCtrl: AlertController,
    private cameraService: CameraService
  ) { }
  ngOnInit() {
    this.initForm();
    this.getData();

  }
  ngDoCheck() {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    //  this.imageService.getImage();
    this.avatar = localStorage.getItem('avatar')
  }

  initForm() {
    this.form = this.fb.group({
      avatar: new FormControl(''),
      full_name: new FormControl('', Validators.required),
      birthday: new FormControl(''),
      phone_number: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(PATTERN.PHONE_NUMBER_VIETNAM_FULL)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(PATTERN.EMAIL)
      ])),
      full_address: new FormControl('', Validators.required),
    });
  }

  async avatarSetting() {
    let alertAvatarSetting = await this.alertCtrl.create({
      message: 'Setting your photo',
      mode: 'ios',
      buttons: [
        {
          text: 'View your photo',
          handler: () => {
            this.cameraService.viewAvatar();
          }
        },
        {
          text: 'Choose from library',
          handler: () => {

            this.cameraService.getAvatarUpload(this.image_avatar);
          }
        },
        {
          text: 'Take photo',
          handler: () => {
            this.cameraService.getAvatarTake(this.image_avatar);
          }
        },
        {
          text: 'Remove current photo',
          handler: () => {
            this.cameraService.removeAvatar();
          }
        },
        {
          text: 'Cancel',
          role: 'destructive',
        },
      ]
    });
    await alertAvatarSetting.present();
  }

  async openModalPassword(ev: any) {
    const popover = await this.passwordModal.create({
      component: ChangepasswordPage,
      cssClass: 'modalPassword',
    });
    return await popover.present();
  }

  activateInput() {
    this.activatedInput = true;
    this.lastForm = this.form.value;
  }
  deactivateInput() {
    this.activatedInput = false;
    this.form.patchValue(this.lastForm);
  }

  getData() {
    this.accountService.getAccounts().subscribe(data => {
      data.app_user.birthday;
      this.form.patchValue(data.app_user);
      this.loadedData = true;
      this.loadingService.dismiss();
    });
  }

  updateInfo() {
    this.loadingService.present();
    let data = this.form.value;
    this.accountService.updateProfile(data).subscribe((data) => {
      localStorage.setItem('fullname', data.app_user.full_name);
      this.activatedInput = false;
      this.loadingService.dismiss();
      this.toastService.present('Updated sucessfully !');
    },
    (data)=> {
      this.loadingService.dismiss();
      this.toastService.present('Please check your infomation is valid !');
    }
    );
  }

  canUpdate() {
    return JSON.stringify(this.lastForm) !== JSON.stringify(this.form.value) && this.form.valid;
  }
}

