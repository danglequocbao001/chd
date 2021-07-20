import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageNotiService {

  private data: BehaviorSubject<IDataNoti> = new BehaviorSubject<IDataNoti>({ title: '', des: '', routerLink: '' });

  constructor() { }

  public get dataStatusNoti(): Observable<IDataNoti> {
    return this.data.asObservable();
  }
  
  public setdataStatusNoti(value: IDataNoti) {
    this.data.next(value);
  }
}
export interface IDataNoti {
  title: string;
  des: string;
  routerLink: string;
}
export interface IDataSlide {
  title: string;
  image: string;
  label: string;
  routerLink: string;
}