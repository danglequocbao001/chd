import { Component, OnInit, Input, NgModule } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderService } from 'src/app/@app-core/http';
import { DateTimeService, LoadingService } from 'src/app/@app-core/utils';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-modal-detail-order',
  templateUrl: './modal-detail-order.page.html',
  styleUrls: ['./modal-detail-order.page.scss'],
})
export class ModalDetailOrderPage implements OnInit {
  @Input() data;

  setOrderItemId() {
    localStorage.setItem('orderItemId', this.data.order.id);
  }

  order = {
    id: 0,
    status: '',
    note: '',
    full_address: '',
    phone_number_receiver: '',
    created_at: '',
    order_details: []
  }

  loadedData = false;

  isCanceled = '';

  // fakeImg = 'assets/img/food.svg';
  
  constructor(
    private orderService: OrderService,
    private dateTimeService: DateTimeService,
    public modalController: ModalController,
    private loadingService: LoadingService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.loadingService.present();
    this.getData(this.data.order.id);
  }

  getDayString() {
    if (this.order.created_at == '') {
      return ' ';
    }
    return this.dateTimeService.DAYS[new Date(this.order.created_at).getDay()].toUpperCase();
  }

  getData(id) {
    this.orderService.get(id).subscribe(data => {
      this.order = data.order;
      this.loadedData = true;
      if(data.order.status == 'pending') {
        this.isCanceled = 'Cancel Order';
      } else if (data.order.status == 'failed') {
        this.isCanceled = 'The order is canceled';
      }
      this.loadingService.dismiss();
    })
  }

  async reallyWantCancelOrder(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Do you really want to <strong>cancel</strong> this order?',
      mode: 'ios',
      backdropDismiss: true,
      buttons: [
        {
          text: 'No, thank!',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.cancelOrder(id);
          }
        }
      ]
    });

    await alert.present();
  }

  cancelOrder(id) {
    this.loadingService.present();
    this.order.status = 'failed';
    this.orderService.delete(id).subscribe(data => {
      this.loadingService.dismiss();
      this.isCanceled = 'The order is canceled';
    })
  }

  calTotalPrice() {
    return this.order.order_details.reduce((acc, cur) => acc + cur.amount*cur.total_price , 0)
  }
  calTotalAmount() {
    return this.order.order_details.reduce((acc, cur) => acc + cur.amount, 0);
  }

}
