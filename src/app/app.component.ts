import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, take } from 'rxjs';
import { Company } from './model/company/company';
import { User } from './model/user/user';
import { AppState } from './store/app-state';
import { loadUserCompany, logout, verfiyUserIsLogged } from './store/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showMenu = false;

  company$!: Observable<Company | undefined>;
  isVerifyingUserLogged$!: Observable<boolean>;
  user$!: Observable<User | undefined>;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.company$ = this.store.select(state => state.user.company);
    this.isVerifyingUserLogged$ = this.store.select(state => state.user.isVerifyingUserLogged);
    this.user$ = this.store.select(state => state.user.user);

    this.store.dispatch(verfiyUserIsLogged());
    this.onVerifiedUserLogged();
  }

  hideMenu() {
    this.showMenu = false;
  }

  private onVerifiedUserLogged() {
    this.store.select('user')
      .pipe(
        filter(state => state.isVerifiedUserLogged),
        take(1)
      ).subscribe(state => {
        if (!state.user) {
          this.router.navigate(['login']);
        } else {
          this.store.dispatch(loadUserCompany());
          if (this.isBasePath()) {
            this.router.navigate(['home']);
          }
        }
      })
  }

  logout() {
    this.store.dispatch(logout());
  }

  isBasePath() {
    return window.location.pathname == '' || window.location.pathname == '/';
  }

}
