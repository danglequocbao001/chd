import { GeolocationService } from './../../@app-core/utils/geolocation.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { IPageRequest, ChabadService, AccountService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-chabad',
  templateUrl: './chabad.page.html',
  styleUrls: ['./chabad.page.scss'],
})
export class ChabadPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  chabads = [];
  avatar;
  pageRequest: IPageRequest = {
    page: 1,
    per_page: 3
  }
  constructor(
    private router: Router,
    private chabadService: ChabadService,
    private GeolocationService: GeolocationService,
    private loadingServie: LoadingService

  ) { }
  ngOnInit() {
    this.loadingServie.present();
    this.GeolocationService.getCurrentLocation();
    this.getData();
  }

  goToMap(chabad) {
    this.GeolocationService.goToMap(chabad.location.lat, chabad.location.long);
  }
  
  getData(func?) {
    this.GeolocationService.getCurrentLocation();
    this.chabadService.getAll(this.pageRequest).subscribe(data => {
      this.loadingServie.dismiss();
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
  goToChabadDetail(chabad) {
    const data = {
      id: chabad.id,
      distance: chabad.distance
    }
    this.router.navigate(['chabad'], {
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
