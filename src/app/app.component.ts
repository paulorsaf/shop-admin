import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, take } from 'rxjs';
import { User } from './model/user/user';
import { AppState } from './store/app-state';
import { logout, verfiyUserIsLogged } from './store/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showMenu = false;

  isVerifyingUserLogged$!: Observable<boolean>;
  user$!: Observable<User>;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.isVerifyingUserLogged$ = this.store.select(state => state.user.isVerifyingUserLogged);
    this.user$ = this.store.select(state => state.user.user);

    this.store.dispatch(verfiyUserIsLogged());
    this.onVerifiedUserLogged();
  }

  logout() {
    this.showMenu = false;
    this.store.dispatch(logout());
  }

  goToPage(page: string) {
    this.showMenu = false;
    this.router.navigate([page]);
  }

  private onVerifiedUserLogged() {
    this.store.select('user')
      .pipe(
        filter(state => state.isVerifiedUserLogged),
        take(1)
      ).subscribe(state => {
        if (!state.user) {
          this.router.navigate(['login']);
        } else if (this.isBasePath()) {
          this.router.navigate(['home']);
        }
      })
  }

  isBasePath() {
    return window.location.pathname == '' || window.location.pathname == '/';
  }

}
