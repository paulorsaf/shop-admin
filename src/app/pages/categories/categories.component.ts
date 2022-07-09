import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/model/category/category';
import { AppState } from 'src/app/store/app-state';
import { load } from './store/categories.actions';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  dataSource!: MatTableDataSource<Category[]>;
  displayedColumns = ['id', 'name'];

  isLoading$!: Observable<boolean>;

  subscription!: Subscription;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(state => state.categories.isLoading);
    this.subscription = this.store.select(state => state.categories.categories)
      .subscribe(categories => {
        this.dataSource = new MatTableDataSource<any>(categories);
      });

    this.store.dispatch(load());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goToCategoryDetail(category: Category) {
    this.router.navigate([`categories/${category.id}`]);
  }

}
