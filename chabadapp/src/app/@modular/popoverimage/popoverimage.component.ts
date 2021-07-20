import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popoverimage',
  templateUrl: './popoverimage.component.html',
  styleUrls: ['./popoverimage.component.scss'],
})
export class PopoverimageComponent implements OnInit {

  constructor() { }
  image: any;
  ngOnInit() {
    this.image = localStorage.getItem('avatar')
  }
  
}
