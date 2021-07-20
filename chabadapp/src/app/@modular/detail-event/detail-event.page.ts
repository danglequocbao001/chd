import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EventsService } from 'src/app/@app-core/http';
import { DateTimeService, LoadingService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.page.html',
  styleUrls: ['./detail-event.page.scss'],
})
export class DetailEventPage implements OnInit {
  @Input() data;
  donation_logs = [];
  // donors = [
  //   {
  //     thumbImage: 'assets/icon/person.svg',
  //     name: 'David',
  //     purpose: 'The Temple in Jerusalem was any of structures which were located',
  //     money: '18',
  //     unitPrice: 'USD',
  //     thankSentence: 'Thank member!'
  //   },
  //   {
  //     thumbImage: 'assets/icon/person.svg',
  //     name: 'David',
  //     purpose: 'The Temple in Jerusalem was any of structures which were located',
  //     money: '18',
  //     unitPrice: 'USD',
  //     thankSentence: 'Thank member!'
  //   }
  // ]

  setEventItemId() {
    localStorage.setItem('eventItemId', this.data.event.id);

  }

  event = {
    id: '',
    name: '',
    description: '',
    start_time: '',
    end_time: '',
    cal_time: '',
    chabad_id: ''
  }
  btnJoinElement;
  disabledBtn = false;
  loadedData = false;

  constructor(
    private router: Router,
    private eventService: EventsService,
    private dateTimeService: DateTimeService,
    public modalController: ModalController,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.getData(this.data.event.id);
    this.btnJoinElement = document.querySelectorAll('.btn-join-with-us');
    this.data.event.joined && this.disableButtons();
  }

  disableButtons() {
    this.disabledBtn = true;
    for (let i = 0; i < this.btnJoinElement.length; i++) {
      this.btnJoinElement[i].classList.remove('active-effect');
      this.btnJoinElement[i].classList.add('disabled-btn');
    }
  }

  getData(id) {
    this.eventService.getDetail(id).subscribe(data => {
      this.event = data.event;
      this.loadedData = true;
      this.donation_logs = data.event.donation_logs
      
    })
  }

  goToDonate() {
    this.modalController.dismiss(null, 'cancel');
    const data = {
      type: 'Event',
      chabad: {
        id: this.event.chabad_id
      },
      event: {
        id: this.event.id
      }
    }
    this.router.navigate(['/donate'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  getDayString() {
    if (this.event.cal_time == '') {
      return ' ';
    }
    return this.dateTimeService.DAYS[new Date(this.event.cal_time).getDay()].toUpperCase();
  }

  chooseJoinSelection(selection) {
    if (this.disabledBtn) return;

    this.disableButtons();
    if (selection) {
      this.loadingService.present();
      this.setEventItemId();
      this.eventService.joinEvent(this.event).subscribe(() => {
        this.loadingService.dismiss();
      });
    }
  }

  calBodyHeight() {
    if (this.data.event.joined == false) {
      return this.donation_logs.length == 0 ? 'calc(100% - 110px)' : 'calc(100% - 195px - 110px)';
    } else {
      return this.donation_logs.length == 0 ? 'calc(100%)' : 'calc(100% - 195px)';
    }
  }
}
