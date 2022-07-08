import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoginEffects } from '../pages/login/store/login.effects';
import { loginReducer } from '../pages/login/store/login.reducers';
import { UserEffects } from './user/user.effects';
import { userReducer } from './user/user.reducers';

@NgModule({
  imports: [
    StoreModule.forRoot([]),
    StoreModule.forFeature('login', loginReducer),
    StoreModule.forFeature('user', userReducer),
    StoreDevtoolsModule.instrument({maxAge: 25}),

    EffectsModule.forRoot([
      LoginEffects,
      UserEffects
    ])
  ]
})
export class AppStoreModule { }
