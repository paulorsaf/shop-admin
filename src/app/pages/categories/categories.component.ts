import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription, take } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Category } from 'src/app/model/category/category';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { loadCategories, removeCategory } from './store/categories.actions';
import { changeCategoryVisibility } from './category-detail/store/category-detail.actions';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  dataSource!: MatTableDataSource<Category[]>;
  displayedColumns = ['name', 'showProduct', 'delete'];

  hasCategories$!: Observable<boolean>;
  isChangingVisibility$!: Observable<boolean>;
  categoryChangingVisibilityId$!: Observable<string | undefined>;
  isLoading$!: Observable<boolean>;

  errorSubscription!: Subscription;
  subscription!: Subscription;

  constructor(
    private dialog: MatDialog,
    private messageService: MessageService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.hasCategories$ = this.store.select(
      store => store.categories.categories.length > 0
    );
    this.isLoading$ = this.store.select(store =>
      store.categories.isLoading || store.categories.isRemoving
    );

    this.categoryChangingVisibilityId$ = this.store.select(
      store => store.categories.categoryDetailId
    );
    this.isChangingVisibility$ = this.store.select(
      store => store.categoryDetail.isChangingVisibility
    );
    
    this.onCategoriesChanged();
    this.onError();
      
    this.store.dispatch(loadCategories());
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
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

  toggleVisibility(category: Category) {
    this.store.dispatch(changeCategoryVisibility({id: category.id}));
  }

  private remove(category: Category) {
    this.store.dispatch(removeCategory({category}));
  }

  private onCategoriesChanged() {
    this.subscription =
      this.store.select(store => store.categories.categories)
        .subscribe(categories => {
          this.dataSource = new MatTableDataSource<any>(categories);
        });
  }

  private onError() {
    this.errorSubscription =
      this.store.select(store => store.categories.error)
        .pipe(filter(error => !!error))
        .subscribe(error => this.messageService.showError(error.error));
  }

}
