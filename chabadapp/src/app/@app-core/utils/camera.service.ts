import { Injectable } from '@angular/core';
import { LoadingService, ToastService } from 'src/app/@app-core/utils';
import { Camera } from '@ionic-native/camera/ngx';
import { AccountService } from '../http';
import { PopoverController } from '@ionic/angular';
import { PopoverimageComponent } from '../../@modular/popoverimage/popoverimage.component';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class CameraService {
    constructor(
        public camera: Camera,
        public loadingService: LoadingService,
        public accountService: AccountService,
        public popoverController: PopoverController,
        public toastService: ToastService

    ) { }
    public getAvatarUpload(image_avatar) {
        this.loadingService.present('Please wait a minute...');
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
                this.accountService.uploadPhoto(formData).subscribe((data) => {
                    image_avatar = {
                        "app_user": {
                            "avatar": data['data'][0]
                        }
                    }
                    this.accountService.updateAvatar(image_avatar).subscribe(data => {
                        if(localStorage.getItem('avatar') != null ){
                            localStorage.removeItem('avatar');
                            localStorage.setItem('avatar', image_avatar.app_user.avatar);
                            this.loadingService.dismiss();
                            this.toastService.present('Updated sucessfully !', 'top', 2000);
                        }
                    })
                    this.accountService.getAccounts().subscribe();
                    
                })
            } else {
            }
        }).catch((err) => {
            console.error(err)
            this.loadingService.dismiss();
            this.toastService.present('Not success, Please try Again !', 'top', 2000);
        })
    }
    public getAvatarTake(image_avatar) {
        this.loadingService.present('Please wait a minute...');
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
                this.accountService.uploadPhoto(formData).subscribe((data) => {
                    image_avatar = {
                        "app_user": {
                            "avatar": data['data'][0]
                        }
                    }
                    localStorage.setItem('avatar', image_avatar.app_user.avatar)
                    this.accountService.updateAvatar(image_avatar).subscribe(data => {
                         this.loadingService.dismiss();
                        this.toastService.present('Updated sucessfully!', 'top', 2000);
                    })
                    this.accountService.getAccounts().subscribe();
                })
            } else {
            }
        }).catch((err) => {
            console.error(err)
            this.loadingService.dismiss();
            this.toastService.present('Not success, Please try again!', 'top', 2000);
        })
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

    async viewAvatar() {
        const popoverImage = await this.popoverController.create({
            component: PopoverimageComponent,
            cssClass: 'image_popover_css',
            translucent: true,
            mode: 'md'
        });
        return await popoverImage.present();
    }

    removeAvatar() {
        this.loadingService.present('Please wait a minute...');
        let image_null = {
            "app_user": {
                "avatar": null
            }
        }
        this.accountService.updateAvatar(image_null).subscribe(
            (data: any) => {
                if(!localStorage.getItem('avatar')) {
                    console.log(1)
                    localStorage.removeItem('avatar');
                    localStorage.setItem('avatar', 'https://i.imgur.com/edwXSJa.png')
                }
                else {
                    console.log(`1`)
                    localStorage.setItem('avatar', 'https://i.imgur.com/edwXSJa.png')
                }
                this.loadingService.dismiss();
                this.toastService.present('Remove sucessfully !', 'top', 2000);
            },
            (data: any) => {
                this.loadingService.dismiss();
                if (data.error) {
                    this.toastService.present('Not success, Please try again !', 'top', 2000);
                }
            }
        )
    }
}