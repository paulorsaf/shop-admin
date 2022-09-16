import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription, take } from 'rxjs';
import { Purchase } from 'src/app/model/purchase/purchase';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { loadPurchaseDetail } from './store/purchase-detail.actions';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.scss']
})
export class PurchaseDetailComponent implements OnInit, OnDestroy {

  isLoading$!: Observable<boolean>;
  purchase$!: Observable<Purchase | undefined>;

  errorSubscription!: Subscription;
  updateSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(
      state => state.purchaseDetail.isLoading || state.purchaseDetail.isUpdating
    );
    this.purchase$ = this.store.select(state => state.purchaseDetail.purchase);

    this.onError();
    this.onUpdated();

    this.store.dispatch(loadPurchaseDetail({id: this.getId()}));
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
    this.updateSubscription.unsubscribe();
  }

  private getId() {
    return this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  private onError() {
    this.errorSubscription = this.store
      .select(state => state.purchaseDetail.error)
      .pipe(
        filter(error => !!error)
      )
      .subscribe(error => {
        this.messageService.showError(error.error)
      });
  }

  private onUpdated() {
    this.updateSubscription = this.store
      .select(state => state.purchaseDetail.isUpdated)
      .pipe(filter(isUpdated => isUpdated))
      .subscribe(() => {
        this.messageService.showSuccess('Estado da compra atualizado com sucesso')
      })
  }
  
}
