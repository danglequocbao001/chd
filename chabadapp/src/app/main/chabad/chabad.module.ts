import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChabadPageRoutingModule } from './chabad-routing.module';

import { ChabadPage } from './chabad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChabadPageRoutingModule
  ],
  declarations: [ChabadPage]
})
export class ChabadPageModule {}
