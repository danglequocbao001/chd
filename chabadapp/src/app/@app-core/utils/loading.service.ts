import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingService {

  isLoading = false;

  constructor(
    public loadingController: LoadingController
  ) { }

  async present(text?) {
    this.isLoading = true;
    return await this.loadingController.create({
      message: text,
      mode: 'ios',
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      })
    });
  }

  async dismiss() {
    this.isLoading = false;
    let topLoader = await this.loadingController.getTop();
    while (topLoader) {
      if (!(await topLoader.dismiss())) {
        break;
      }
      topLoader = await this.loadingController.getTop();
    }
  }
}
