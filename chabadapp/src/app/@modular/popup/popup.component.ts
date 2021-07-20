import { Component, OnInit } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { PopoverController } from '@ionic/angular';
import { AccountService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/utils';
import { PopoverimageComponent } from '../popoverimage/popoverimage.component';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {

  constructor(private camera: Camera, private accountService: AccountService, 
    public popoverController: PopoverController,
    private loadingService: LoadingService) { }
    image_url: any;
    image_avatar: any;
    image_null: any;
    remove_label = '';
  ngOnInit() {
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
  dismissPopover() {
    this.popoverController.dismiss();
  }
  async presentImage(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverimageComponent,
      cssClass: 'image_popover_css',
      event: ev,
      translucent: true,
      mode: 'md'
    });
    return await popover.present();
  }
  uploadAvatar(){
    this.loadingService.present();
    const options = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    }
    this.camera.getPicture(options).then(async (dataUrl) => {
      if (dataUrl) {
        var dataUri = "data:image/jpeg;base64," + dataUrl;
        var image = this.dataURItoBlob(dataUri);
        let formData = new FormData;
        formData.append('files[]', image);
          this.accountService.uploadPhoto(formData).subscribe((data)=>{
            this.image_avatar = {
              "app_user": {
                  "avatar": data['data'][0]
              }
          }
            this.loadingService.dismiss();
            this.updateAvatar();
          })
      }
      else {
        this.loadingService.dismiss();
      }
    }).catch(() => {
      this.loadingService.dismiss();
    })
  }
  updateAvatar() {
    this.accountService.updateAvatar(this.image_avatar).subscribe(data => {
       this.dismissPopover();
    })
  }
  takephoto() {
    this.loadingService.present();
    const options = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true
    }
    this.camera.getPicture(options).then(async (dataUrl) => {
      if (dataUrl) {
        var dataUri = "data:image/jpeg;base64," + dataUrl;
        var image = this.dataURItoBlob(dataUri);
        let formData = new FormData;
        formData.append('files[]', image);
        this.accountService.uploadPhoto(formData).subscribe(
        (data)=>{
          this.image_url = {
            "app_user": {
                "avatar": data['data'][0]
            }
        }
          this.loadingService.dismiss();
          this.updateTakePhoto()
        },
        (data)=> {
        }
        )
      }
      else {
      }
    }).catch(() => {
      this.loadingService.dismiss();
    })
  }
  updateTakePhoto() {
    this.accountService.updateAvatar(this.image_url).subscribe(data => {
       this.dismissPopover();
    })
  }
  removeAvatar() {
    this.image_null = {
      "app_user": {
          "avatar":null
      }
  }
    this.accountService.updateAvatar(this.image_null).subscribe(
      (data:any) => {
      this.remove_label = 'Updated !'
      this.dismissPopover();
      },
      (data:any) => {
        if(data.error) {
          this.remove_label = 'Error !'
          this.dismissPopover();
        }
      }
   )
  }
 
  dataURItoBlob(dataURI) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    }
    else {
      byteString = encodeURI(dataURI.split(',')[1]);
    }
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }
  ionViewWillLeave() {
    this.accountService.getAccounts().subscribe(data=>{
      if(data.app_user.avatar == null) {
        data.app_user['avatar'] = "https://i.imgur.com/edwXSJa.png";
        localStorage.setItem('avatar', data.app_user.avatar);
      }
      localStorage.setItem('avatar', data.app_user.avatar);
    })
  }
}
