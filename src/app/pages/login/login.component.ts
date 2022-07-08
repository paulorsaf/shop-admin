import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription, take } from 'rxjs';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { login, recoverPassword } from './store/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form!: FormGroup;

  isLoggingIn$!: Observable<boolean>;
  isRecoveringPassword$!: Observable<boolean>;

  loginSubscription!: Subscription;

  constructor(
    private formBulder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.isLoggingIn$ = this.store.select(state => state.login.isLoggingIn);
    this.isRecoveringPassword$ = this.store.select(state => state.login.isRecoveringPassword);

    this.form = this.formBulder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.watchLogin();
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

  login() {
    this.store.dispatch(login(this.form.value));
  }

  recoverPassword() {
    this.store.dispatch(recoverPassword({email: this.form.value.email}));

    this.store.select('login')
      .pipe(
        filter(state => state.isRecoveredPassword || state.error),
        take(1)
      )
      .subscribe(state => {
        if (state.isRecoveredPassword) {
          this.messageService.showSuccess('Verifique a sua caixa de email');
        }
      })
  }

  private watchLogin() {
    this.loginSubscription = this.store.select('login').subscribe(state => {
      if (state.isLoggedIn) {
        this.router.navigate(['/home']);
      }
      if (state.error) {
        this.messageService.showError(state.error);
      }
    })
  }

}
