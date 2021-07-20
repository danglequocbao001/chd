import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlideService {
  private data: BehaviorSubject<IDataNoti> = new BehaviorSubject<IDataNoti>({
    title: '',
    label:'',
    image: '',
    routerLink: ''
  })
  constructor() { }
  public get datafrom(): Observable<IDataNoti> {
    return this.data.asObservable();
  }
  public setdataSlide(value: IDataNoti) {
    this.data.next(value);
  }
}
export interface IDataNoti {
  image: any;
  title: string;
  label: string,
  routerLink: string;
}