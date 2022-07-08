import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { User } from '../../model/user/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  login(email: string, password: string): Observable<User> {
    return from(
      this.afAuth.signInWithEmailAndPassword(email, password)
        .catch(this.translateLoginError)
    );
  }

  recoverPassword(email: string): Observable<void> {
    return from(
      this.afAuth.sendPasswordResetEmail(email)
        .catch(this.translateLoginError)
    );
  }

  private translateLoginError(error: {code: string}) {
    if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
      return Promise.reject({message: 'Email e/ou senha nao encontrados.'});
    }
    return Promise.reject(error);
  }

}
