import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PageNotiRoutingModule } from './page-noti-routing.module';
import { PageNotiComponent } from './page-noti.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PageNotiRoutingModule
  ],
  exports: [PageNotiComponent],
})
export class PageNotiModule { }
