
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BASE_URL from '../../../auth/services/helper';
import { Size } from './interfaces/size.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  constructor(private http: HttpClient) { }

  public getAllProducts(): Observable<any> {
    return this.http.get(BASE_URL + "/product/getAllProducts");
  }

  public getProductById(id: any): Observable<any> {
    return this.http.get(BASE_URL + `/product/getProductById/${id}`);
  }

  public getSizeByProductId(size: any): Observable<any> {
    return this.http.post(BASE_URL + "/size/getSizeByProductId", size);
  }




}


