import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalDetailOrderPage } from './modal-detail-order.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDetailOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDetailOrderPageRoutingModule {}
