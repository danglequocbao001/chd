import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SlideComponent } from './slide.component';
import { SliderRoutingModule } from './slider-routing.module';



@NgModule({
  declarations: [SlideComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SliderRoutingModule
  ]
})
export class SlideModule { }
