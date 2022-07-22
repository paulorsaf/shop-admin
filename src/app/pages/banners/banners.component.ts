import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Banner } from 'src/app/model/banner/banner';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { loadBanners, removeBanner } from './store/banners.actions';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit, OnDestroy {

  dataSource!: MatTableDataSource<Banner[]>;
  displayedColumns = ['productName', 'delete'];

  isLoading$!: Observable<boolean>;
  hasBanners$!: Observable<boolean>;

  errorSubscription!: Subscription;
  subscription!: Subscription;

  constructor(
    private dialog: MatDialog,
    private messageService: MessageService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Banner[]>([]);

    this.hasBanners$ = this.store.select(store => !!store.banners.banners?.length)
    this.isLoading$ = this.store.select(store =>
      store.banners.isLoading || store.banners.isRemoving
    );

    this.onError();
    this.onBannersChange();

    this.store.dispatch(loadBanners());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  newBanner() {
    this.router.navigate(['banners/new']);
  }

  bannerDetail(banner: Banner){
    this.router.navigate([`banners/${banner.id}`]);
  }

  askRemove($event: any, banner: Banner) {
    $event.stopPropagation();

    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: "Deseja remover o banner?",
        description: "Ao remover um banner ele não aparecerá mais no aplicativo"
      },
    }).afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(removeBanner({banner}));
      }
    });
  }

  private onBannersChange() {
    this.subscription =
      this.store
        .select(state => state.banners.banners)
        .subscribe(banners => {
          this.dataSource = new MatTableDataSource<any>(banners);
        });
  }

  private onError() {
    this.errorSubscription =
      this.store.select(state => state.banners.error)
        .pipe(filter(error => !!error))
        .subscribe(error => this.messageService.showError(error.error));
  }

}
