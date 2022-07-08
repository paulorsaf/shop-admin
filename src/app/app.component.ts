import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, take } from 'rxjs';
import { AppState } from './store/app-state';
import { verfiyUserIsLogged } from './store/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isVerifyingUserLogged$!: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.isVerifyingUserLogged$ = this.store.select(state => state.user.isVerifyingUserLogged);

    this.store.dispatch(verfiyUserIsLogged());
    this.onVerifiedUserLogged();
  }

  private onVerifiedUserLogged() {
    this.store.select('user')
      .pipe(
        filter(state => state.isVerifiedUserLogged),
        take(1)
      ).subscribe(state => {
        if (!state.user) {
          this.router.navigate(['login']);
        }
        if (this.isBasePath()) {
          this.router.navigate(['home']);
        }
      })
  }

  isBasePath() {
    return window.location.pathname == '' || window.location.pathname == '/';
  }

}
