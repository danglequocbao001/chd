import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { APICONFIG } from '..';
import { requestQuery } from '../../utils';
import { IPageRequest } from '../global';

@Injectable()
export class HistoryService {

  constructor(
    private http: HttpClient
  ) { }

  public getServices(request: IPageRequest) {
    return this.http.get<any>(`${APICONFIG.HISTORY.GET_SERVICES}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  public getEvents(request: IPageRequest) {
    return this.http.get<any>(`${APICONFIG.HISTORY.GET_EVENTS}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }
}
