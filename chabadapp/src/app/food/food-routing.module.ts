import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodPage } from './food.page';

const routes: Routes = [
  {
    path: '',
    component: FoodPage
  },
  {
    path: 'food-checkout',
    loadChildren: () => import('./food-checkout/food-checkout.module').then( m => m.FoodCheckoutPageModule)
  },
  {
    path: 'food-basket',
    loadChildren: () => import('./food-basket/food-basket.module').then( m => m.FoodBasketPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodPageRoutingModule {}
