import { GeolocationService } from './../../@app-core/utils/geolocation.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { IPageRequest, MatchUsersService } from 'src/app/@app-core/http';
import { DateTimeService, LoadingService } from 'src/app/@app-core/utils';

@Component({
   selector: 'app-people',
   templateUrl: './people.page.html',
   styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {
   @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

   app_users:any = [
      {
         id: 63,
         full_name: "Silas Schaden",
         email: 'silas@gmail.co',
         phone_number: "+84341234567",
         avatar: "https://anime.com/suzushiro.jpg",
         location: {
            lat: 10.4645,
            lng: 106.33333
         },
         distance: 0
      },
      {
         id: 63,
         full_name: "Silas Schaden",
         email: 'silas@gmail.co',
         phone_number: "+84341234567",
         avatar: "https://anime.com/suzushiro.jpg",
         location: {
            lat: 19.4645,
            lng: 105.33333
         },
         distance: 0
      },
      {
         id: 63,
         full_name: "Silas Schaden",
         email: 'silas@gmail.co',
         phone_number: "+84341234567",
         avatar: "https://anime.com/suzushiro.jpg",
         location: {
            lat: 11.4645,
            lng: 108.33333
         },
         distance: 0
      }
   ]

   users = [];
   pageRequest: IPageRequest = {
      page: 1,
      per_page: 9
   }

   constructor(
      public dateTimeService: DateTimeService,
      private matchUsersService: MatchUsersService,
      private GeolocationService: GeolocationService,
      private laodingService: LoadingService
   ) { }

   ngOnInit() {
      this.laodingService.present();
      this.getData();
      // this.showPeopleNearBy();
   }

   ionViewWillEnter() {
      // this.showPeopleNearBy();
   }

   showPeopleNearBy(func?) {
      this.GeolocationService.getCurrentLocation();
      for(let user of this.app_users) {
         let temp = user;
         user.distance = this.GeolocationService.distanceFromUserToPoint(this.GeolocationService.centerService.lat, this.GeolocationService.centerService.lng, user.location.lat, user.location.lng); 
         console.log(user.distance)
      }
      this.app_users.forEach((d, i) => {
         if (i % 3 == 0) {
            this.app_users.push([d]);
         } else {
            this.app_users[this.app_users.length - 1].push(d);
         }
      })

      func && func();

   }
 
   getData(func?) {
      this.matchUsersService.getAll(this.pageRequest).subscribe(data => {
         this.laodingService.dismiss();
         data.app_users.forEach((d, i) => {
            if (i % 3 == 0) {
               this.users.push([d]);
            } else {
               this.users[this.users.length - 1].push(d);
            }
         })

         func && func();
         this.pageRequest.page++;

         if (this.getUsersLength() >= data.meta.pagination.total_objects && this.infiniteScroll) {
            this.infiniteScroll.disabled = true;
         }
      })

   }

   getUsersLength() {
      return this.users.reduce((acc, cur) => acc + cur.length, 0);
   }

   getDateString() {
      return this.dateTimeService.getDateString(new Date());
   }

   doRefresh(event) {
      // reset
      this.users = [];
      this.pageRequest.page = 1;
      if (this.infiniteScroll) {
         this.infiniteScroll.disabled = false;
      }

      this.getData(() => {
         event.target.complete();
      })
   }

   loadMoreData(event) {
      this.getData(() => {
         event.target.complete();
      });
   }
}
