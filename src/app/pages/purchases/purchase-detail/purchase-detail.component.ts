import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription, take } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Purchase } from 'src/app/model/purchase/purchase';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { loadPurchaseDetail, updatePurchaseStatus } from './store/purchase-detail.actions';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.scss']
})
export class PurchaseDetailComponent implements OnInit, OnDestroy {

  isLoading$!: Observable<boolean>;
  purchase$!: Observable<Purchase | undefined>;

  status = "";

  errorSubscription!: Subscription;
  loadedSubscription!: Subscription;
  updateSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private messageService: MessageService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(
      state => state.purchaseDetail.isLoading || state.purchaseDetail.isUpdating
    );
    this.purchase$ = this.store.select(state => state.purchaseDetail.purchase);

    this.onError();
    this.onLoaded();
    this.onUpdated();

    this.store.dispatch(loadPurchaseDetail({id: this.getId()}))
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
    this.loadedSubscription.unsubscribe();
    this.updateSubscription.unsubscribe();
  }

  showReceipt() {
    this.purchase$.pipe(take(1)).subscribe(purchase => {
      window.open(purchase?.payment.receiptUrl, '_blank');
    })
  }

  changeStatus() {
    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: "Deseja mudar o estado da compra?"
      },
    }).afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(updatePurchaseStatus({status: this.status}));
      } else {
        this.purchase$.pipe(take(1)).subscribe(purchase => {
          this.status = purchase?.status || "";
        });
      }
    });
  }

  private getId() {
    return this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  private onLoaded() {
    this.loadedSubscription = this.store
      .select(state => state.purchaseDetail.purchase)
      .pipe(
        filter(purchase => !!purchase),
        take(1)
      )
      .subscribe(purchase => {
        this.status = purchase?.status || "";
      });
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
