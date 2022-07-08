import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoginEffects } from '../pages/login/store/login.effects';
import { loginReducer } from '../pages/login/store/login.reducers';

@NgModule({
  imports: [
    StoreModule.forRoot([]),
    StoreModule.forFeature('login', loginReducer),
    StoreDevtoolsModule.instrument({maxAge: 25}),

    EffectsModule.forRoot([
      LoginEffects
    ])
  ]
})
export class AppStoreModule { }
