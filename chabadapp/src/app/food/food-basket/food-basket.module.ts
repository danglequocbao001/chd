import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodBasketPageRoutingModule } from './food-basket-routing.module';

import { FoodBasketPage } from './food-basket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodBasketPageRoutingModule
  ],
  declarations: [FoodBasketPage]
})
export class FoodBasketPageModule {}
