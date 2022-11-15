import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription, take } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Purchase } from 'src/app/model/purchase/purchase';
import { AppState } from 'src/app/store/app-state';
import { updatePurchaseStatus } from '../store/purchase-detail.actions';

@Component({
  selector: 'app-purchase-detail-data',
  templateUrl: './purchase-detail-data.component.html',
  styleUrls: ['./purchase-detail-data.component.scss']
})
export class PurchaseDetailDataComponent implements OnInit, OnDestroy {

  purchase$!: Observable<Purchase | undefined>;

  status = "";
  statusList: {key: string, value: string}[] = [];

  loadedSubscription!: Subscription;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.purchase$ = this.store.select(state => state.purchaseDetail.purchase);

    this.onLoaded();
  }

  ngOnDestroy(): void {
    this.loadedSubscription.unsubscribe();
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

    this.store
      .select(state => state.user.company?.payment.isPaymentAfterPurchase || false)
      .pipe(take(1))
      .subscribe(isPaymentAfterPurchase => {
        if (isPaymentAfterPurchase) {
          this.statusList.push({key: "SORTING_OUT", value: "Empacotando"});
          this.statusList.push({key: "WAITING_PAYMENT", value: "Esperando pagamento"});
          this.statusList.push({key: "VERIFYING_PAYMENT", value: "Verificando pagamento"});
          this.statusList.push({key: "PAID", value: "Pago"});
        } else {
          if (purchase?.payment?.type !== "MONEY") {
            this.statusList.push({key: "VERIFYING_PAYMENT", value: "Verificando pagamento"});
            this.statusList.push({key: "PAID", value: "Pago"});
          }
          this.statusList.push({key: "SORTING_OUT", value: "Empacotando"});
        }
      });

    if (purchase?.address) {
      this.statusList.push({key: "DELIVERYING", value: "Entregando"});
    } else {
      this.statusList.push({key: "READY", value: "Pronto"});
    }
    this.statusList.push({key: "FINISHED", value: "Finalizado"});
    this.statusList.push({key: "CANCELLED", value: "Cancelado"});
  }

}
