import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Company } from 'src/app/model/company/company';
import { User } from 'src/app/model/user/user';
import { AppState } from 'src/app/store/app-state';
import { updateStock } from 'src/app/store/stock/update-stock.actions';
import { logout } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  @Output() itemSelected = new EventEmitter<string>();

  company$!: Observable<Company | undefined>;
  user$!: Observable<User | undefined>;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.company$ = this.store.select(state => state.user.company);
    this.user$ = this.store.select(state => state.user.user);
  }

  goToPage(page: string) {
    this.router.navigate([page]);
    this.itemSelected.emit(page);
  }

  updateStock() {
    this.store.dispatch(updateStock());
  }

  logout() {
    this.store.dispatch(logout());
    this.itemSelected.emit();
  }

}
