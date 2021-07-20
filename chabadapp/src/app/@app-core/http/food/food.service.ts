import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG } from '..';
import { map, catchError } from 'rxjs/operators';
import { requestQuery } from '../../utils';
import { IPageFood } from './food.DTO';

@Injectable()
export class FoodService {
  constructor(
    private http: HttpClient
  ) { }
  public getAll(request: IPageFood) {
    return this.http.get<any>(`${APICONFIG.FOOD.GET}?${(requestQuery(request))}`).pipe(
      map(result => {
        return result;
      }),
      catchError(errorRes => {
        throw errorRes.error;
      })
    );
  }
}
