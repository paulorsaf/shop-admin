import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Cupom } from 'src/app/model/cupom/cupom';
import { AppState } from 'src/app/store/app-state';
import { CupomDetailComponent } from './cupom-detail/cupom-detail.component';
import { loadCupoms } from './store/cupoms.actions';

@Component({
  selector: 'app-cupoms',
  templateUrl: './cupoms.component.html',
  styleUrls: ['./cupoms.component.scss']
})
export class CupomsComponent implements OnInit, OnDestroy {

  cupoms$!: Observable<Cupom[]>;
  isLoading$!: Observable<boolean>;

  dataSource!: MatTableDataSource<Cupom[]>;
  displayedColumns = ['cupom', 'discount', 'amount', 'expireDate'];

  cupomsSubscription!: Subscription;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Cupom[]>([]);

    this.cupoms$ = this.store.select(state => state.cupoms.cupoms);
    this.isLoading$ = this.store.select(state => state.cupoms.isLoading);

    this.onCupomsChange();

    this.store.dispatch(loadCupoms());
  }

  ngOnDestroy(): void {
    this.cupomsSubscription.unsubscribe();
  }

  showAddCupom(cupom?: Cupom) {
    this.dialog.open(CupomDetailComponent, {
      data: {cupom}
    });
  }

  private onCupomsChange() {
    this.cupomsSubscription =
      this.store
        .select(state => state.cupoms.cupoms)
        .subscribe(cupoms => {
          this.dataSource = new MatTableDataSource<any>(cupoms);
        });
  }

}
