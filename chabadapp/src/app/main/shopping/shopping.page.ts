import { GeolocationService } from './../../@app-core/utils/geolocation.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { IPageRequest, ChabadService } from 'src/app/@app-core/http';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.page.html',
  styleUrls: ['./shopping.page.scss'],
})
export class ShoppingPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  chabads = [];
  pageRequest: IPageRequest = {
    page: 1,
    per_page: 3
  }

  constructor(
    private router: Router,
    private chabadService: ChabadService,
    private GeolocationService: GeolocationService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(func?) {
    this.GeolocationService.getCurrentLocation();
    this.chabadService.getAll(this.pageRequest).subscribe(data => {
      for(let chabad of data.chabads) {
        chabad.distance = this.GeolocationService.distanceFromUserToPoint(this.GeolocationService.centerService.lat, this.GeolocationService.centerService.lng, chabad.location.lat, chabad.location.long);
      }
      this.chabads = this.chabads.concat(data.chabads);
      func && func();
      this.pageRequest.page++;

      if (this.chabads.length >= data.meta.pagination.total_objects && this.infiniteScroll) {
        this.infiniteScroll.disabled = true;
      }
    })
  }

  goToMap(chabad) {
    this.GeolocationService.goToMap(chabad.location.lat, chabad.location.long);
  }

  goToFood(chabad) {
    const data = {
      id: chabad.id
    }
    this.router.navigate(['food'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  doRefresh(event) {
    // reset
    this.chabads = [];
    this.pageRequest.page = 1;
    if (this.infiniteScroll) {
      this.infiniteScroll.disabled = false;
    }

    this.getData(() => {
      event.target.complete();
    });
  }

  getChabadImageString(chabad) {
    return `url(${chabad.thumb_image})`;
  }

  loadMoreData(event) {
    this.getData(() => {
      event.target.complete();
    });
  }
}
