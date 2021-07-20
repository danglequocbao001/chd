import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { request } from 'http';
import { map, catchError } from 'rxjs/operators';
import { APICONFIG } from '..';
import { requestQuery } from '../../utils';
import { IPageRequest } from '../global';

@Injectable()
export class MatchUsersService {
  constructor(
    private http: HttpClient
  ) { }

  public getAll(request: IPageRequest) {
    return this.http.get<any>(`${APICONFIG.MATCH_USERS.GET}?${requestQuery(request)}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }
}
