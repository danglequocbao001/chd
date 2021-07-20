import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AccountService } from 'src/app/@app-core/http';
import { OrderService } from 'src/app/@app-core/http/order/order.service';
import { ModalFoodComponent } from 'src/app/@modular/modal-food/modal-food.component';

@Component({
  selector: 'app-food-checkout',
  templateUrl: './food-checkout.page.html',
  styleUrls: ['./food-checkout.page.scss'],
})
export class FoodCheckoutPage implements OnInit {
 
  dataBasket = [];
  dataBaketToCreat = [];
  currentItem: any = {
    id : 0,
    amount : 0,
  }
  note = '';
  order = {
    long: 0.5,
    lat: 0.5,
    note: this.note,
    full_address: '',
    phone_number_receiver: '',
    order_details_attributes: this.dataBaketToCreat
  }
  constructor( 
    private route: ActivatedRoute,
    private orderService: OrderService,
    private modalCtrl: ModalController, 
    private accountService: AccountService) { 
      this.getUserData();
      this.route.queryParams.subscribe(params => {
        if( JSON.parse(params['data']).note == '') {
          this.note = 'No note for this order!'
        }
        else {
          this.note = JSON.parse(params['data']).note;
        }
        this.order.note = this.note;
      })
      this.getDataBasket();
    }

  ngOnInit() {
  }
  
  editText() {
    var fd = document.getElementById("full_address");
    fd.removeAttribute('readonly')
  }

  confirm() {
    localStorage.removeItem('dataBasket');
    this.orderService.creat(this.order).subscribe(data => {
      this.openModalSuccess();
    })
  }
  async openModalSuccess() {
    const popover = await this.modalCtrl.create({
      component: ModalFoodComponent,
      cssClass: 'modalFood',
    });
    return await popover.present();
  }
  ionViewWillLeave() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  plusItem(item) {
    if(item.amount < 99) {
      item.amount++;
    }
    this.setDataBasket();
  }
  minusItem(item) {
    if(item.amount > 1) {
      item.amount--;
    }
    this.setDataBasket();
  }
  removeItem(food) {
    for(let i = 0; i< this.dataBasket.length; i++) {
      if(food.id === this.dataBasket[i].id) {
        this.dataBasket.splice(i,1);
        break;
      }
    }
    this.setDataBasket();
  }
 
  setDataBasket() {
    localStorage.setItem('dataBasket', JSON.stringify(this.dataBasket));
  }
  getDataBasket() {
    this.dataBasket = JSON.parse(localStorage.getItem('dataBasket')) || [];
    for(let i = 0; i< this.dataBasket.length; i++) {
      this.dataBaketToCreat.push({food_id: this.dataBasket[i].id, amount: this.dataBasket[i].amount});
    }
    this.order.order_details_attributes = this.dataBaketToCreat;
  }

  calTotalPrice() {
    return this.dataBasket.reduce((acc, cur) => acc + cur.amount*cur.price , 0)
  }

  getUserData() {
    this.accountService.getAccounts().subscribe(data => {
      this.order.full_address = data.app_user.full_address + ', district ' + data.app_user.district + ', ' + data.app_user.province + ', ' + data.app_user.country_code;
      this.order.phone_number_receiver = data.app_user.phone_number;
    });
  }

}
