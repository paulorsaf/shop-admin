import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { loadDailyPurchaseSummaries } from './store/daily-purchase-summaries.actions';
import { format, subDays } from 'date-fns';
import { MatTableDataSource } from '@angular/material/table';
import { DailyPurchaseSummary } from 'src/app/model/purchase-summary/daily-purchase-summary';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  dataSource!: MatTableDataSource<DailyPurchaseSummary[]>;
  displayedColumns = ['createdAt', 'user', 'price', 'paymentType', 'status', 'delivery'];
  from = format(subDays(new Date(), 1), 'yyyy-MM-dd');
  until = format(new Date(), 'yyyy-MM-dd');

  isLoading$!: Observable<boolean>;
  purchases$!: Observable<DailyPurchaseSummary[]>;

  errorSubscription!: Subscription;
  purchaseSummarySubscription!: Subscription;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<DailyPurchaseSummary[]>([]);
    this.purchases$ = this.store.select(state => state.dailyPurchaseSummaries.dailyPurchaseSummaries);

    this.isLoading$ = this.store.select(state => state.dailyPurchaseSummaries.isLoading);

    this.onSummaryLoaded();
    this.onError();

    this.store.dispatch(loadDailyPurchaseSummaries({from: this.from, until: this.until}));
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
    this.purchaseSummarySubscription.unsubscribe();
  }

  goToPurchase(purchase: DailyPurchaseSummary) {
    this.router.navigate([`purchases/${purchase.id}`]);
  }

  stopPropagation(event$: any) {
    event$.stopPropagation();
  }

  private onError() {
    this.errorSubscription = this.store.select(state => state.dailyPurchaseSummaries.error)
      .pipe(filter(error => error))
      .subscribe(error => {
        this.messageService.showError(error);
      })
  }

  private onSummaryLoaded() {
    this.purchaseSummarySubscription =
      this.store
        .select(state => state.dailyPurchaseSummaries.dailyPurchaseSummaries)
        .subscribe(purchases => {
          this.dataSource = new MatTableDataSource<any>(purchases);
        });
  }

  goToPage(page: string) {
    this.router.navigate([page]);
  }

}
