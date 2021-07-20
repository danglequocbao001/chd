import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountSettingPage } from './account-setting.page';

const routes: Routes = [
  {
    path: '',
    component: AccountSettingPage
  },
  {
    path: 'orders-history',
    loadChildren: () => import('./orders-history/orders-history.module').then( m => m.OrdersHistoryPageModule)
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountSettingPageRoutingModule {}
