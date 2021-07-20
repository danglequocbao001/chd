import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { IPageRequest, APICONFIG } from '..';
import { requestQuery } from '../../utils';

@Injectable()
export class ChabadService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(request: IPageRequest) {
    return this.http.get<any>(`${APICONFIG.CHABAD.GET}?${requestQuery(request)}`).pipe(
      map(result => {
        return result;
      }),
      catchError(errorRes => {
        throw errorRes.error;
      })
    );
  }

  public getDetail(id) {
    return this.http.get<any>(`${APICONFIG.CHABAD.GET_DETAIL(id)}`).pipe(
      map(result => {
        return result;
      }),
      catchError(errorRes => {
        throw errorRes.error;
      })
    );
  }
}
