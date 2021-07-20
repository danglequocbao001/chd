import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { HistoryService } from '../@app-core/http';
import { LoadingService } from '../@app-core/utils';
import { DetailEventPage } from '../@modular/detail-event/detail-event.page';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) ionContent: IonContent;

  currentSegmentValue = 'service';
  lastScrollTop = 0;
  data: any;

  constructor(
    private modalController: ModalController,
    private loadingService: LoadingService,
    private historyService: HistoryService
  ) {
    this.init();
  }

  ngOnInit() {
    // this.loadingService.present();
    this.getDataServices();
    this.getDataEvents();
  }

  init() {
    this.data = {
      services: {
        pageRequest: {
          page: 1,
          per_page: 5
        },
        array: [],
        loadedData: false
      },
      events: {
        pageRequest: {
          page: 1,
          per_page: 5
        },
        array: [],
        loadedData: false
      }
    };
  }

  changedSegment(value) {
    this.ionContent.getScrollElement().then(content => {
      const scrollTop = content.scrollTop;
      this.ionContent.scrollToTop().then(() => {
        this.currentSegmentValue = value;
        this.ionContent.scrollByPoint(0, this.lastScrollTop, 0);
        this.lastScrollTop = scrollTop;
      })
    })
  }

  getDataServices(func?) {
    let events = this.data.services;
    this.historyService.getServices(events.pageRequest).subscribe(data => {
      events.array = events.array.concat(data.events);

      func && func();
      events.pageRequest.page++;

      if (events.array.length >= data.meta.pagination.total_objects) {
        events.loadedData = true;
      }
    })
  }

  getDataEvents(func?) {
    let events = this.data.events;
    this.historyService.getEvents(events.pageRequest).subscribe(data => {
      events.array = events.array.concat(data.events);

      func && func();
      events.pageRequest.page++;
      
      if (events.array.length >= data.meta.pagination.total_objects) {
        events.loadedData = true;
      }
    })
  }

  loadMoreDataServices(event) {
    this.getDataServices(() => {
      event.target.complete();
    })
  }

  loadMoreDataEvents(event) {
    this.getDataEvents(() => {
      event.target.complete();
    })
  }

  async openEventDetailModal(event) {
    const modal = await this.modalController.create({
      component: DetailEventPage,
      cssClass: 'event-detail-modal',
      swipeToClose: true,
      componentProps: {
        data: {
          event: {
            id: event.id
          }
        }
      }
    });
    await modal.present();
  }

  doRefresh(event) {
    this.init();

    let count = 0;
    this.getDataServices(() => {
      count++;
      count == 2 && event.target.complete();
    })
    this.getDataEvents(() => {
      count++;
      count == 2 && event.target.complete();
    })
  }

  scrollToTop(event) {
    event.target.value == this.currentSegmentValue && this.ionContent.scrollToTop(300);
  }
}
