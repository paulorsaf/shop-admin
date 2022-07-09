import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/store/app-state';
import { loadDetail } from './store/products/product-detail.actions';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  form!: FormGroup;

  isLoading$!: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({

    });

    this.isLoading$ = this.store.select(state => state.productDetail.isLoading);

    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.store.dispatch(loadDetail({id}));
  }

  save() {

  }

  cancel() {
    
  }

}
