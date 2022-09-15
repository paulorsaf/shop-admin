import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { logout } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  @Output() itemSelected = new EventEmitter<string>();

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  goToPage(page: string) {
    this.router.navigate([page]);
    this.itemSelected.emit(page);
  }

  logout() {
    this.store.dispatch(logout());
    this.itemSelected.emit();
  }

}
