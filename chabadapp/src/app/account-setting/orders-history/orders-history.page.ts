import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/utils';
import { ModalDetailOrderPage } from 'src/app/@modular/modal-detail-order/modal-detail-order.page';
// import { ModalOrderDetailComponent } from 'src/app/@modular/modal-order-detail/modal-order-detail.component';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.page.html',
  styleUrls: ['./orders-history.page.scss'],
})
export class OrdersHistoryPage implements OnInit {
  data: any;
  lastedData: any;
  constructor(private orderService: OrderService,
    private loadingService: LoadingService,
    private modalController: ModalController,) { 
      this.init();
    }

  ngOnInit() {
    this.loadingService.present();
    this.getDataOrders();
  }

  init() {
    this.data = {
      orders: {
        pageRequest: {
          page: 1,
          per_page: 6,
        },
        array: [],
        loadedData: false
      },
    };
  }

  getDataOrders(func?) {
    let orders = this.data.orders;
    this.orderService.getAll(orders.pageRequest).subscribe(data => {
      orders.array = orders.array.concat(data.orders);
      this.lastedData = orders.array[orders.array.length - 1];
      this.loadingService.dismiss();
      func && func();
      orders.pageRequest.page++;
      if (orders.array.length >= data.meta.pagination.total_objects) {
        orders.loadedData = true;
      }
    })
  }

  loadMoreDataOrders(event) {
    this.getDataOrders(() => {
      event.target.complete();
    })
  }

  doRefresh(event) {
    this.init();
    let count = 0;
    this.getDataOrders(() => {
      count++;
      count == 1 && event.target.complete();
    })
  }
  ionViewWillLeave() {
    this.modalController.dismiss();
  }
  async openOrderDetailModal(order) {
    const modal = await this.modalController.create({
      component: ModalDetailOrderPage,
      cssClass: 'event-detail-modal',
      swipeToClose: true,
      componentProps: {
        data: {
          order: {
            id: order.id
          }
        }
      }
    });
    await modal.present();
  }

}
