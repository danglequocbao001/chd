import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentmethodsPage } from './paymentmethods.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentmethodsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentmethodsPageRoutingModule {}
