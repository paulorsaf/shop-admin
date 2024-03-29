import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AppStoreModule } from './store/app-store.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddTokenHeaderHttpRequestInterceptor } from './interceptors/add-token-header-http-request.interceptor';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SideMenuModule } from './components/side-menu/side-menu.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    
    AppStoreModule,

    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,

    NgxSkeletonLoaderModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,

    SideMenuModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AddTokenHeaderHttpRequestInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
