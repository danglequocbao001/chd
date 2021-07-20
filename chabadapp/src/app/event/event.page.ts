import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { IPageEvent, ChabadService, EventsService, AccountService } from '../@app-core/http';
import { DateTimeService, LoadingService } from '../@app-core/utils';
import { DetailEventPage } from '../@modular/detail-event/detail-event.page';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  chabad = {
    id: '',
    thumb_image: ''
  };
  loadedChabad = false;

  EVENT_COLOR = [
    '#D7ADC2',
    '#E7D0AE',
    '#BAD4E3'
  ];

  currentDay;
  dateList = [];
  activeDateItem;
  pageRequestEvent: IPageEvent = {
    page: 1,
    per_page: 100,
    cal_date: '',
    chabad_id: ''
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chabadService: ChabadService,
    private eventService: EventsService,
    public dateTimeService: DateTimeService,
    public modalController: ModalController,
    public accountService: AccountService
  ) {
    this.currentDay = new Date();
    for (let i = 0; i < 7; i++) {
      let nextDay = new Date(this.currentDay);
      nextDay.setDate(nextDay.getDate() + i);

      this.dateList.push({
        id: i,
        day: nextDay,
        events: []
      })
    }
    this.activeDateItem = this.dateList[0].id;
  }

  ngOnInit() {
    this.getData();
  }
  avatar:any;
  ionViewWillEnter() {
    this.avatar = localStorage.getItem('avatar')
  }
  getDataChabad(id, func?) {
    this.chabadService.getDetail(id).subscribe(data => {
      this.chabad = data.chabad;
      func && func();
      this.loadedChabad = true;
    })
  }

  getDataEvents() {
    for (let i = 0; i < 7; i++) {
      // reset
      this.dateList[i].events = [];

      this.pageRequestEvent.cal_date = this.dateTimeService.getDateString2(this.dateList[i].day);

      this.eventService.getAll(this.pageRequestEvent).subscribe(data => {
        let eventColorIndex = 0;
        data.events.forEach(d => {
          this.dateList[i].events.push(d);
          this.dateList[i].events[this.dateList[i].events.length - 1].color = this.EVENT_COLOR[eventColorIndex];
          this.dateList[i].events[this.dateList[i].events.length - 1].isLoading = false;
          (eventColorIndex++ >= this.EVENT_COLOR.length - 1) && (eventColorIndex = 0);
        });
      })
    }
  }

  getData(func?) {
    this.route.queryParams.subscribe(params => {
      this.pageRequestEvent.chabad_id = JSON.parse(params['data']).id;
      this.getDataChabad(JSON.parse(params['data']).id, func);
      this.getDataEvents();
    }).unsubscribe();
  }

  changeDateItem(dateItem) {
    this.activeDateItem = dateItem.id;
    this.currentDay = dateItem.day;
  }

  joinedAll(dateItem) {
    return dateItem.events.every(event => event.joined == true);
  }

  toggleJoiningAll(dateItem) {
    dateItem.events.forEach(event => event.isLoading = true);
    if (this.joinedAll(dateItem)) {
      dateItem.events.forEach(event => {
        event.joined && this.eventService.cancelEvent(event).subscribe(() => {
          event.joined = !event.joined;
          event.isLoading = false;
        });
      });
    } else {
      dateItem.events.forEach(event => {
        if (event.joined) {
          event.isLoading = false;
        } else this.eventService.joinEvent(event).subscribe(() => {
          event.joined = !event.joined;
          event.isLoading = false;
        });
      });
    }
  }

  toggleJoiningEvent(eventItem) {
    event.stopPropagation();
    eventItem.isLoading = true;
    this.toggleJoinedApi(eventItem);
  }

  toggleJoinedApi(event) {
    if (event.joined) {
      this.eventService.cancelEvent(event).subscribe(() => {
        event.joined = !event.joined;
        event.isLoading = false;
      });
    } else {
      this.eventService.joinEvent(event).subscribe(() => {
        event.joined = !event.joined;
        event.isLoading = false;
      });
    }
  }

  isSomeLoading(dateItem) {
    return dateItem.events.some(event => event.isLoading == true);
  }

  doRefresh(event) {
    this.getData(() => {
      event.target.complete();
    })
  }

  getChabadImageString() {
    return `url(${this.chabad.thumb_image})`;
  }

  async openEventDetailModal(event) {
    const modal = await this.modalController.create({
      component: DetailEventPage,
      cssClass: 'event-detail-modal',
      swipeToClose: true,
      componentProps: {
        data: {
          event: {
            id: event.id,
            joined: event.joined
          }
        }
      }
    });
    await modal.present();

    modal.onWillDismiss().then(data => {
      if (data.role != 'cancel') { 
        let eventItemId = localStorage.getItem('eventItemId');
        eventItemId && this.setJoiningEventLocal(eventItemId);
      }
    })
  }

  setJoiningEventLocal(eventItemId) {
    this.dateList[this.activeDateItem].events.forEach(service => {
      if (service.id == eventItemId) {
        service.joined = true;
        localStorage.removeItem('eventItemId');
      }
    });
  }

  goToUserInfo() {
    this.router.navigateByUrl('account-setting');
  }
}
