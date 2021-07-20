import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthManagerPageRoutingModule } from './auth-manager-routing.module';

import { AuthManagerPage } from './auth-manager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthManagerPageRoutingModule
  ],
  declarations: [AuthManagerPage]
})
export class AuthManagerPageModule {}
