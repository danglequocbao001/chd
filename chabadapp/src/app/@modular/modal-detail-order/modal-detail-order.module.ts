import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalDetailOrderPageRoutingModule } from './modal-detail-order-routing.module';

import { ModalDetailOrderPage } from './modal-detail-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalDetailOrderPageRoutingModule
  ],
  declarations: [ModalDetailOrderPage]
})
export class ModalDetailOrderPageModule {}
