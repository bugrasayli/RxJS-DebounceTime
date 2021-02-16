import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subject } from 'rxjs/';
import { debounceTime,map, mergeMap } from 'rxjs/operators';
import { Brand } from '../Model/brand';
import { BrandService } from '../Services/brand.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit, OnDestroy {

  constructor(private brandServ: BrandService) {
    brandServ.get().subscribe(x => this.brands = x);
  }
  ngOnDestroy(): void {
    this.inputChange.unsubscribe(); // It will work, after this component destroyed
  } 
  inputChange: Subject<string>;
  text = '';
  brands: Brand [] = [];
  ngOnInit() {
    this.inputChange = new Subject<string>();
    this.inputChange
      .pipe(
        debounceTime(1500),  
        mergeMap((keyUpStr) => {
          return this.brandServ.get()
            .pipe(
              map((data) => {
                return { data, keyUpStr }
              }))
        }))
      .subscribe(combinedData => {
        this.brands = combinedData.data.filter(z => z.name.includes(combinedData.keyUpStr))
      });
  }
  onKey(event: any) {
    this.inputChange.next(event.target.value);
  }
}
