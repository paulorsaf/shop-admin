import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { User } from '../../model/user/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth
  ) { }

  login(email: string, password: string): Observable<User> {
    return from(
      this.auth.signInWithEmailAndPassword(email, password)
        .then(user => ({
          email,
          uid: user?.user?.uid || ""
        }))
        .catch(this.translateLoginError)
    );
  }

  recoverPassword(email: string): Observable<void> {
    return from(
      this.auth.sendPasswordResetEmail(email)
        .catch(this.translateLoginError)
    );
  }

  findLoggedUser(): Observable<User> {
    return new Observable<User>(observer => {
      this.auth.onAuthStateChanged(user => {
        if (user) {
          observer.next({email: user.email || "", uid: user.uid});
        } else {
          observer.error({});
        }
        observer.complete();
      }, () => {
        observer.error({});
        observer.complete();
      })
    })
  }

  logout(): Observable<void> {
    return from(this.auth.signOut().then(() => {
      return;
    }));
  }

  private translateLoginError(error: {code: string}) {
    if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
      return Promise.reject({message: 'Email e/ou senha nao encontrados.'});
    }
    if (error.code.includes("auth/requests-from-referer") && error.code.includes("-are-blocked")) {
      return Promise.reject({message: 'Tentativa de acesso bloqueada.'});
    }
    return Promise.reject(error);
  }

}
