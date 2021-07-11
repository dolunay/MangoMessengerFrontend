import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {RouterModule} from '@angular/router';
import { SendCodeComponent } from './send-code/send-code.component';
import {FormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SendCodeComponent,
    RegisterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot([
      {path: 'sign-up', component: SignUpComponent},
      {path: 'send-code', component: SendCodeComponent},
      {path: '', redirectTo: '/send-code', pathMatch: 'full'},
    ]),
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
