import { Injectable } from '@angular/core';
import { delay, Observable, of, switchMap } from 'rxjs';
import { Product } from 'src/app/model/product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [{
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
      id: '2',
      name: 'Feminino'
    },
    colors: [""],
    id: "10",
    images: ["/shop-cms/sites/default/files/2022-06/booties-2047596_640.jpg"],
    name: "Produto 1",
    price: 120,
    priceWithDiscount: 99,
    sizes: [""]
  }]

  constructor() { }

  find(): Observable<Product[]> {
    return of({})
      .pipe(
        delay(1000),
        switchMap(() => {
          return of(this.products)
        })
      )
  }

  findById(id: string): Observable<Product> {
    return of({})
      .pipe(
        delay(1000),
        switchMap(() => {
          return of(this.products.find(p => p.id === id) as Product)
        })
      )
  }

}
