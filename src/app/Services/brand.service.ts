import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../Model/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http : HttpClient) { }
  url="assets/brands.json";
  get() : Observable<Brand[]>
  {
    return this.http.get<Brand[]>(this.url);
  }
}
