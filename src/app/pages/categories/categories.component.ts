import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Category } from 'src/app/model/category/category';
import { AppState } from 'src/app/store/app-state';
import { load, remove } from './store/categories.actions';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  dataSource!: MatTableDataSource<Category[]>;
  displayedColumns = ['name', 'delete'];

  hasCategories$!: Observable<boolean>;
  isLoading$!: Observable<boolean>;

  subscription!: Subscription;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.hasCategories$ = this.store.select(state => state.categories.categories.length > 0);
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

  goToNewCategoryPage() {
    this.router.navigate([`categories/new`]);
  }

  askRemove($event: any, category: Category) {
    $event.stopPropagation();

    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: "Deseja remover a categoria?",
        description: "Ao remover uma categoria ela não aparecerá mais no aplicativo"
      },
    }).afterClosed().subscribe(result => {
      if (result) {
        this.remove(category);
      }
    });
  }

  private remove(category: Category) {
    this.store.dispatch(remove({category}));
  }

}
