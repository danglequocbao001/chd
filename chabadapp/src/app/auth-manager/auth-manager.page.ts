import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-manager',
  templateUrl: './auth-manager.page.html',
  styleUrls: ['./auth-manager.page.scss'],
})
export class AuthManagerPage implements OnInit {

  constructor() { }

  ngOnInit() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
  }

}
