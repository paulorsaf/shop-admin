import { Injectable } from '@angular/core';
import { delay, from, Observable, of, switchMap, timeout } from 'rxjs';
import { Product } from 'src/app/model/product/product';
import { User } from '../../model/user/user';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  find(): Observable<Product[]> {
    return of({})
      .pipe(
        delay(1000),
        switchMap(() => {
          return of([{
            category: {
              id: '1',
              name: 'Masculino'
            },
            colors: [""],
            id: "9",
            images: ["/shop-cms/sites/default/files/2022-06/booties-2047596_640.jpg"],
            name: "Produto 3",
            price: 80,
            priceWithDiscount: 70,
            sizes: [""]
          }, {
            category: {
              id: '1',
              name: 'Masculino'
            },
            colors: [""],
            id: "9",
            images: ["/shop-cms/sites/default/files/2022-06/booties-2047596_640.jpg"],
            name: "Produto 3",
            price: 80,
            priceWithDiscount: 70,
            sizes: [""]
          }])
        })
      )
  }

}
