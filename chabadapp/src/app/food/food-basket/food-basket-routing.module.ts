import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodBasketPage } from './food-basket.page';

const routes: Routes = [
  {
    path: '',
    component: FoodBasketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodBasketPageRoutingModule {}
