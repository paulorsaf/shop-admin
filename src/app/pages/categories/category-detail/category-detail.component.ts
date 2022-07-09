import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, take } from 'rxjs';
import { AppState } from 'src/app/store/app-state';
import { loadDetail } from './store/category-detail.actions';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {

  form!: FormGroup;

  isLoading$: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.isLoading$ = store.select(state => state.categoryDetail.isLoading);
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.store.dispatch(loadDetail({id}));

    this.createForm();
  }

  cancel() {

  }

  save() {

  }

  private createForm() {
    this.store.select('categoryDetail')
      .pipe(
        filter(state => !!state.isLoaded),
        take(1)
      )
      .subscribe(state => {
        this.form = this.formBuilder.group({
          name: [state.category?.name || '']
        });
      })
  }

}
