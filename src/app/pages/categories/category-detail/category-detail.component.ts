import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription, take } from 'rxjs';
import { Category } from 'src/app/model/category/category';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { loadDetail, saveDetail } from './store/category-detail.actions';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit, OnDestroy {

  form!: FormGroup;

  isLoading$!: Observable<boolean>;
  isSaving$!: Observable<boolean>;

  errorSubscription!: Subscription;
  saveSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(state => state.categoryDetail.isLoading);
    this.isSaving$ = this.store.select(state => state.categoryDetail.isSaving);

    this.loadCategory();

    this.onCategorySaved();
    this.onError();
  }

  ngOnDestroy(): void {
    this.saveSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

  save() {
    this.store.dispatch(saveDetail({category: {
      id: this.getId(),
      name: this.form.value.name
    }}))
  }

  private loadCategory() {
    const id = this.getId();
    if (this.isNew()) {
      this.createForm();
    } else {
      this.store.dispatch(loadDetail({id}));
      this.createFormOnCategoryLoaded();
    }
  }

  private onCategorySaved() {
    this.saveSubscription = this.store
      .select(state => state.categoryDetail.isSaved)
      .pipe(
        filter(isSaved => isSaved),
        take(1)
      )
      .subscribe(() => window.history.back());
  }

  private onError() {
    this.errorSubscription = this.store
      .select(state => state.categoryDetail.error)
      .pipe(
        filter(isSaved => isSaved)
      )
      .subscribe(error => {
        this.messageService.showError(error.error)
      });
  }

  private isNew() {
    return this.getId() === "new";
  }

  private getId() {
    return this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  private createFormOnCategoryLoaded() {
    this.store.select('categoryDetail')
      .pipe(
        filter(state => !!state.isLoaded),
        take(1)
      )
      .subscribe(state => {
        this.createForm(state.category)
      })
  }

  private createForm(category?: Category) {
    this.form = this.formBuilder.group({
      name: [category?.name || '', [Validators.required]]
    });
  }

}
