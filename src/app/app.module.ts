import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';
import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import {VerifyEmailComponent} from './auth/verify-email/verify-email.component';
import {VerifyPhoneComponent} from './auth/verify-phone/verify-phone.component';
import {RefreshTokenComponent} from './auth/refresh-token/refresh-token.component';
import {LogoutComponent} from './auth/logout/logout.component';
import {LogoutAllComponent} from './auth/logout-all/logout-all.component';
import { MainComponent } from './messenger/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    VerifyEmailComponent,
    VerifyPhoneComponent,
    RefreshTokenComponent,
    LogoutComponent,
    LogoutAllComponent,
    MainComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot([
      {path: 'register', component: RegisterComponent},
      {path: 'login', component: LoginComponent},
      {path: 'verify-phone', component: VerifyPhoneComponent},
      {path: 'verify-email', component: VerifyEmailComponent},
      {path: 'main', component: MainComponent},
      {path: '', redirectTo: '/login', pathMatch: 'full'},
    ]),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
