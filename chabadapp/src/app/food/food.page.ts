import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FoodService, IPageFood } from '../@app-core/http';
import { IonInfiniteScroll } from '@ionic/angular';
import { LoadingService } from '../@app-core/utils';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  pageFoodRequest: IPageFood = {
    page: 1,
    per_page: 6,
    chabad_id: ''
  }
  dataBasket: any = [];
  currentItem: any = {
    id: 0,
    amount: 0,
  }
  listFood = [];
  anmCart = false;
  fakeImg = 'assets/img/food.svg';
  loadedData = false;
  constructor(
    public modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private foodService: FoodService,
    private loadingService: LoadingService,
  ) {
  }
  ngOnInit() {
    this.loadingService.present();
    this.getData();
  }
  ionViewWillEnter() {
    this.getDataBasket();
    this.anmCart = false;
    localStorage.removeItem('note');
  }
  addItem(item) {
    this.anmCart = true;
    this.currentItem = item;
    this.currentItem.amount = 1;
  }
  plusItem() {
    if (this.currentItem.amount < 99) {
      this.currentItem.amount++;
    }
  }
  minusItem() {
    if (this.currentItem.amount > 1)
      this.currentItem.amount--;
  }

  clickButtonAdd() {
    this.anmCart = false;
    let duplicate = false;
    for (let i = 0; i < this.dataBasket.length; i++) {
      if (this.dataBasket[i].id == this.currentItem.id) {
        this.dataBasket[i].amount += this.currentItem.amount;
        duplicate = true;
        break;
      }
    }
    if (duplicate == false) {
      this.dataBasket.push({ id: this.currentItem.id, amount: this.currentItem.amount, name: this.currentItem.name, price: this.currentItem.price });
    }
    this.setDataBasket();
  }
  goToFoodDetail() {
    this.router.navigate(['food/food-basket']);
  }
  setDataBasket() {
    localStorage.setItem('dataBasket', JSON.stringify(this.dataBasket));
  }
  getDataBasket() {
    this.dataBasket = JSON.parse(localStorage.getItem('dataBasket')) || [];

  }
  calTotalAmount() {
    return this.dataBasket.reduce((acc, cur) => acc + cur.amount, 0);
  }
  getData(func?) {
    this.route.queryParams.subscribe(params => {
      this.pageFoodRequest.chabad_id = JSON.parse(params['data']).id;
      this.foodService.getAll(this.pageFoodRequest).subscribe(data => {
        this.listFood = this.listFood.concat(data.foods);
        func && func();
        this.loadingService.dismiss();
        this.pageFoodRequest.page++;

        if(this.listFood.length >= data.meta.pagination.total_objects) {
          this.loadedData = true;
        }
      })
    }).unsubscribe();
  }

  doRefresh(event) {
    this.listFood = [];
    this.loadedData = false;
    this.pageFoodRequest.page = 1;
    if (this.infiniteScroll) {
      this.infiniteScroll.disabled = false;
    }

    this.getData(() => {
      event.target.complete();
    });
  }

  loadMoreData(event) {
    this.getData(() => {
      event.target.complete();
    })
  }
}
