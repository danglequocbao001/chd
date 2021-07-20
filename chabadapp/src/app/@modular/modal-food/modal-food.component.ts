import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-food',
  templateUrl: './modal-food.component.html',
  styleUrls: ['./modal-food.component.scss'],
})
export class ModalFoodComponent implements OnInit {

  constructor(private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {}
  dismiss() {
    this.router.navigate(['main/shopping']);
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
