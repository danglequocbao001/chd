import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/@app-core/http';

@Component({
  selector: 'app-food-basket',
  templateUrl: './food-basket.page.html',
  styleUrls: ['./food-basket.page.scss'],
})
export class FoodBasketPage implements OnInit {
  dataBasket = [];
  hasPaymentModal = false;
  data_BasketToCreate = [];
  paymentSelectElement: any;
  paymentMethods = [
    {
      srcIcon: 'assets/icon/dollar.svg',
      name: 'Cash',
      id: 0
    },
    {
      srcIcon: 'assets/icon/visa.svg',
      name: 'VISA/MASTER',
      id: 1
    }
  ];
  currentPaymentMethodId = 1;
  currentItem: any = {
    id : 0,
    amount : 0,
  }
  note = '';
  full_address = '';
  constructor(private router: Router, private accountService: AccountService) { }

  ngOnInit() {
    this.getDataBasket();
    this.getUserData();
  }
  order() {
    
    const data = {
      note: this.note
    }
    this.router.navigate(['food/food-checkout'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
  aleart() {
  }
  editText() {
    var fd = document.getElementById("full_address");
    fd.removeAttribute('readonly')
    // document.getElementById
  }

  ionViewDidEnter() {
    this.paymentSelectElement = document.querySelector('.payment-method-container');
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
        this.data_BasketToCreate.splice(i,1);
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
    this.data_BasketToCreate = JSON.parse(localStorage.getItem('data_BasketToCreate')) || [];
  }

  calTotalPrice() {
    return this.dataBasket.reduce((acc, cur) => acc + cur.amount*cur.price , 0)
  }
  calTotalAmount() {
    return this.dataBasket.reduce((acc, cur) => acc + cur.amount, 0);
  }
  getUserData() {
    this.accountService.getAccounts().subscribe(data => {
      this.full_address = data.app_user.full_address + ', district ' + data.app_user.district + ', ' + data.app_user.province + ', ' + data.app_user.country_code;
    });
  }
  toggleHasPaymentModal(value) {
    this.hasPaymentModal = value;
  }
  onCheckClickOutsidePaymentSelect(e) {
    if (this.paymentSelectElement && !this.paymentSelectElement.contains(e.target)) {
      this.toggleHasPaymentModal(false);
    }
  }
  changePayment(paymentMethod) {
    this.currentPaymentMethodId = paymentMethod.id;
    this.toggleHasPaymentModal(false);
  }
}
