import { GeolocationService } from './../@app-core/utils/geolocation.service';
import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IPageEvent, ChabadService, EventsService, AccountService } from '../@app-core/http';
import { DateTimeService } from '../@app-core/utils';
import { DetailEventPage } from '../@modular/detail-event/detail-event.page';

@Component({
  selector: 'app-chabad',
  templateUrl: './chabad.page.html',
  styleUrls: ['./chabad.page.scss'],
})
export class ChabadPage implements OnInit {
  chabad = {
    id: '',
    name: '',
    address: '',
    description: '',
    thumb_image: '',
    location: {
      lat: '',
      long: ''
    },
  };
  distance: ''
  loadedChabad = false;

  SERVICE_COLOR = [
    '#D7ADC2',
    '#E7D0AE',
    '#BAD4E3'
  ];

  currentDay;
  dateList = [];
  activeDateItem;
  hiddenDateList = true;
  avatar :any;
  avatarReplace = 'https://i.imgur.com/edwXSJa.png';

  pageRequestEvent: IPageEvent = {
    page: 1,
    per_page: 100,
    cal_date: '',
    chabad_id: ''
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chabadService: ChabadService,
    private eventService: EventsService,
    public dateTimeService: DateTimeService,
    public modalController: ModalController,
    private GeolocationService: GeolocationService,
    private accountService: AccountService
  ) {
    this.currentDay = new Date();
    for (let i = 0; i < 7; i++) {
      let nextDay = new Date(this.currentDay);
      nextDay.setDate(nextDay.getDate() + i);
      this.dateList.push({
        id: i,
        day: nextDay,
        services: [],
        events: [],
        hiddenEvents: true
      })
    }
    this.activeDateItem = this.dateList[0].id;
  }

  ngOnInit() {
    this.getData();
  }
  ionViewWillEnter() {
    this.accountService.getAccounts().subscribe(result => {
      if(result.app_user.avatar == null || result.app_user.avatar == '') {
        this.avatar = "https://i.imgur.com/edwXSJa.png";
      }
      else {
        this.avatar = result.app_user.avatar;
      }
    })
  }
  getDataChabad(id, func?) {
    this.chabadService.getDetail(id).subscribe(data => {
      this.chabad = data.chabad;
      func && func();
      this.loadedChabad = true;
    })
  }

  goToMap() {
    this.GeolocationService.goToMap(this.chabad.location.lat, this.chabad.location.long);
  }
  getUrl() {
    return `url(${this.avatar})`
  }
  getDataEvents() {
    for (let i = 0; i < 7; i++) {
      // reset
      this.dateList[i].services = [];
      this.dateList[i].events = [];

      let nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + i);
      this.pageRequestEvent.cal_date = this.dateTimeService.getDateString2(nextDay);

      this.eventService.getAll(this.pageRequestEvent).subscribe(data => {
        let serviceColorIndex = 0;
        data.events.forEach(d => {
          if (d.event_type == 'both') {
            this.dateList[i].events.push(d);
            this.dateList[i].events[this.dateList[i].events.length - 1].color = '#F5F5F5';
            this.dateList[i].events[this.dateList[i].events.length - 1].isLoading = false;
          } else {
            this.dateList[i].services.push(d);
            this.dateList[i].services[this.dateList[i].services.length - 1].color = this.SERVICE_COLOR[serviceColorIndex];
            this.dateList[i].services[this.dateList[i].services.length - 1].isLoading = false;
            (serviceColorIndex++ >= this.SERVICE_COLOR.length - 1) && (serviceColorIndex = 0);
          }
        });
      })
    }
  }

  getData(func?) {
    this.route.queryParams.subscribe(params => {
      this.pageRequestEvent.chabad_id = JSON.parse(params['data']).id;
      this.distance = JSON.parse(params['data']).distance;
      this.getDataChabad(JSON.parse(params['data']).id, func);
      this.getDataEvents();
    }).unsubscribe();
  }
  changeDateItem(dateItem) {
    this.activeDateItem = dateItem.id;
    this.hiddenDateList = false;
    this.currentDay = dateItem.day;
  }
  joinedAll(dateItem) {
    return dateItem.services.every(service => service.joined == true) && dateItem.events.every(event => event.joined == true);
  }
  isSomeLoading(dateItem) {
    return dateItem.events.some(event => event.isLoading == true) || dateItem.services.some(event => event.isLoading == true);
  }

  toggleJoiningAll(dateItem) {
    dateItem.services.forEach(event => event.isLoading = true);
    dateItem.events.forEach(event => event.isLoading = true);
    if (this.joinedAll(dateItem)) {
      dateItem.services.forEach(event => {
        event.joined && this.eventService.cancelEvent(event).subscribe(() => {
          event.joined = !event.joined;
          event.isLoading = false;
        });
      });
      dateItem.events.forEach(event => {
        event.joined && this.eventService.cancelEvent(event).subscribe(() => {
          event.joined = !event.joined;
          event.isLoading = false;
        });
      });
    } else {
      dateItem.services.forEach(event => {
        if (event.joined) {
          event.isLoading = false;
        } else this.eventService.joinEvent(event).subscribe(() => {
          event.joined = !event.joined;
          event.isLoading = false;
        });
      });
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

  toggleHiddenEvents(dateItem) {
    dateItem.hiddenEvents = !dateItem.hiddenEvents;
  }

  goToPray() {
    const data = {
      type: 'Chabad',
      chabad: {
        id: this.chabad.id
      }
    }
    this.router.navigate(['/pray'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  goToDonate() {
    const data = {
      type: 'Chabad',
      chabad: {
        id: this.chabad.id
      }
    }
    this.router.navigate(['/donate'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
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
      if (data.role == 'cancel') {
        this.hideDateList();
      } else {
        let eventItemId = localStorage.getItem('eventItemId');
        eventItemId && this.setJoiningEventLocal(eventItemId);
      }
    })
  }

  setJoiningEventLocal(eventItemId) {
    this.dateList[this.activeDateItem].services.forEach(service => {
      if (service.id == eventItemId) {
        service.joined = true;
        localStorage.removeItem('eventItemId');
      }
    });
    this.dateList[this.activeDateItem].events.forEach(service => {
      if (service.id == eventItemId) {
        service.joined = true;
        localStorage.removeItem('eventItemId');
      }
    });
  }

  hideDateList() {
    this.hiddenDateList = true;
  }

  goToUserInfo() {
    this.router.navigateByUrl('account-setting');
    this.hideDateList();
  }
}
