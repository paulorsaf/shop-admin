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
  statusList: {key: string, value: string}[] = [];

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
    this.onUpdated();

    this.store.dispatch(loadPurchaseDetail({id: this.getId()}));

    this.onLoaded();
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
        input: this.status === "CANCELLED" ? {
          label: "Motivo:"
        } : undefined,
        title: "Deseja mudar o estado da compra?"
      },
    }).afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(updatePurchaseStatus({
          reason: result?.value,
          status: this.status,
        }));
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

        this.setStatusList(purchase!);
      });
  }

  private setStatusList(purchase: Purchase) {
    this.statusList.push({key: "CREATED", value: "Solicitado"});
    if (purchase?.payment?.type !== "MONEY") {
      this.statusList.push({key: "VERIFYING_PAYMENT", value: "Verificando pagamento"});
      this.statusList.push({key: "PAID", value: "Pago"});
    }
    this.statusList.push({key: "SORTING_OUT", value: "Empacotando"});
    this.statusList.push({key: "READY", value: "Pronto"});
    if (purchase?.address) {
      this.statusList.push({key: "DELIVERYING", value: "Entregando"});
    }
    this.statusList.push({key: "FINISHED", value: "Finalizado"});
    this.statusList.push({key: "CANCELLED", value: "Cancelado"});
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
