import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { AccountService } from 'src/app/@app-core/http';
import { SlideService } from 'src/app/@modular/slide/slide.service';
import { IDataSlide } from '../page-noti/page-noti.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
})
export class SlideComponent implements OnInit {
  @ViewChild('mySlider', { static: true })
  slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(
    private router: Router,
    private accountService: AccountService
    ) {

  }
  public title;
  public image;
  public routerLink = '';
  public label = '';
  clicked = 0;

  ngOnInit() {
  }
  skip() {
    this.accountService.getAccounts().subscribe();
    if (localStorage.getItem('Authorization')) {
      this.router.navigate(['main/chabad']);
    } else {
      this.router.navigate(['auth-manager/login']);
    }
  }
  goNext() {
    this.slides.slideNext();
  }

}
