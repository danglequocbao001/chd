import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public toastController: ToastController
  ) { }

  async present(message, position = 'top', duration = 1000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position == 'top' ? 'top' : 'bottom'
    });
    toast.present();
  }
}
