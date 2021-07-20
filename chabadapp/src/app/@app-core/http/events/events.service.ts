import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { requestQuery } from '../../utils';
import { APICONFIG } from '../@http-config';
import { IPageEvent } from './event.DTO';

@Injectable()
export class EventsService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(request: IPageEvent) {
    return this.http.get<any>(`${APICONFIG.EVENTS.GET}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  // public getAllWithChabadId(request: IPageEvent, id) {
  //   return this.http.get<any>(`${APICONFIG.EVENTS.GET_WITH_CHABAD_ID(id)}?${(requestQuery(request))}`).pipe(
  //     map((result) => {
  //       return result;
  //     }),
  //     catchError((errorRes) => { throw errorRes.error; }));
  // }

  public getDetail(id: string) {
    return this.http.get<any>(`${APICONFIG.EVENTS.GET_DETAIL(id)}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  public joinEvent(event) {
    const request = {
      attention_log: {
        event_id: event.id
      }
    }
    return this.http.post(`${APICONFIG.EVENTS.JOIN}`, request).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }));
  }

  public cancelEvent(event) {
    const request = {
      event_id: event.id
    }
    return this.http.post(`${APICONFIG.EVENTS.CANCEL}`, request).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }));
  }

  //   public getAccessoryDetail(id: string) {
  //     return this.http.get<any>(`${APICONFIG.ACCESSORIES.GET_DETAIL(id)}`).pipe(
  //       map((result) => {
  //         return result;
  //       }),
  //       catchError((errorRes) => { throw errorRes.error; }));
  //   }

  //   public createAccessory(payload: any) {
  //     return this.http.post<any>(`${APICONFIG.ACCESSORIES.CREATE}`, payload).pipe(
  //       map((result) => {
  //         // this.toastr.success(SUCCESS.CREATE, STATUS.SUCCESS);
  //         return result;
  //       }),
  //       catchError((errorRes) => { throw errorRes.error; }));
  //   }

  //   public editAccessory(id: string, modifier: any) {
  //     return this.http.put<any>(`${APICONFIG.ACCESSORIES.EDIT(id)}`, modifier).pipe(
  //       map((result) => {
  //         // this.toastr.success(SUCCESS.EDIT, STATUS.SUCCESS);
  //         return result;
  //       }),
  //       catchError((errorRes) => {
  //         throw errorRes.error;
  //       }));
  //   }

  //   public deleteAccessory(id: string) {
  //     return this.http.delete(`${APICONFIG.ACCESSORIES.DELETE(id)}`).pipe(
  //       map((result) => {
  //         // this.toastr.success(SUCCESS.DELETE, STATUS.SUCCESS);
  //         return result;
  //       }),
  //       catchError((errorRes: any) => {
  //         throw errorRes.error;
  //       }));
  //   }
}
