import { Inject, InjectionToken, NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from './../environments/environment';
// 使用http模組來串接web api, 一定要在BrowserModule之後載入
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
// Providers
import { ErrorsHandler } from "./shared/providers/error-handler";
// components
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
// auth
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AuthDashboardComponent } from './auth/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
// nebular themes
import { NbThemeModule, NbLayoutModule, NbCardModule, NbButtonModule, NbInputModule} from '@nebular/theme';
// environment
export const EnvironmentToken = new InjectionToken('ENVIRONMENT');
declare let gtag: Function;

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    ShoppingCartComponent,
    // auth
    SignInComponent,
    SignUpComponent,
    AuthDashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    // NB theme relating
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
  ],
  providers: [
    { provide: EnvironmentToken, useValue: environment },
    { provide: ErrorHandler, useClass: ErrorsHandler },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(EnvironmentToken) private env: any) {
    gtag('config', this.env.GOOGLE.GA_TRACKING_ID, {
      'cookie_domain': 'none',
      'cookie_update': false,
      // 'user_id': this.GetUserId(),
      'debug_mode':true,
    });
    // gtag('config', this.env.GOOGLE.GA_TRACKING_ID_OLD, {
    //   'cookie_domain': 'none',
    //   'cookie_update': false,
    //   // 'user_id': this.GetUserId(),
    //   'debug_mode':false,
    // });
  }
  GetUserId() {
    return Math.floor(Math.random() * 10000000)
  }
}
