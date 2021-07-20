import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { requestQuery } from '../../utils';
import { APICONFIG } from '../@http-config';
import { IPageRequest } from '../global';

@Injectable({
  providedIn: 'root'
})
export class DonateService {

  constructor(  private http: HttpClient) { }
  public donateLog(req) {
    return this.http.post(`${APICONFIG.DONATES.DONATE}`, req).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }));

  }
}
