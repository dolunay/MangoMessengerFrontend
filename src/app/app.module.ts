import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import {VerifyEmailComponent} from './auth/verify-email/verify-email.component';
import {MainComponent} from './messenger/main/main.component';
import {ProfileSettingsComponent} from './messenger/profile-settings/profile-settings.component';
import {ContactsComponent} from './messenger/contacts/contacts.component';
import {NavigationBarComponent} from './messenger/auxiliary/navigation-bar/navigation-bar.component';
import {ReceivedMessageComponent} from './messenger/auxiliary/received-message/received-message.component';
import {ChatFooterComponent} from './messenger/auxiliary/chat-footer/chat-footer.component';
import {ChatItemActiveComponent} from './messenger/auxiliary/chat-item-active/chat-item-active.component';
import {ProfileSettingsSidebarComponent} from "./messenger/auxiliary/profile-settings-sidebar/profile-settings-sidebar.component";
import {ProfileLogoutButtonComponent} from './messenger/auxiliary/profile-logout-button/profile-logout-button.component';
import {AuthInterceptor} from "./interceptors/auth-interceptor.service";
import {ContactItemComponent} from "./messenger/auxiliary/contact-item/contact-item.component";
import {RequestHeaderInterceptor} from "./interceptors/request-header.interceptor";
import {JoinGroupComponent} from './messenger/auxiliary/join-group/join-group.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {CreateGroupDialogComponent} from './messenger/dialogs/create-group-dialog/create-group-dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from '@angular/material/icon'
import {MatInputModule} from "@angular/material/input";
import {VerifyEmailNoteComponent} from './messenger/auxiliary/verify-email-note/verify-email-note.component';
import {PasswordRestoreRequestComponent} from './messenger/password-restore-request/password-restore-request.component';
import {PasswordRestoreFormComponent} from './messenger/password-restore-form/password-restore-form.component';
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    VerifyEmailComponent,
    MainComponent,
    ProfileSettingsComponent,
    ContactsComponent,
    NavigationBarComponent,
    ReceivedMessageComponent,
    ChatFooterComponent,
    ChatItemActiveComponent,
    ProfileSettingsSidebarComponent,
    ProfileLogoutButtonComponent,
    ContactItemComponent,
    JoinGroupComponent,
    CreateGroupDialogComponent,
    VerifyEmailNoteComponent,
    PasswordRestoreRequestComponent,
    PasswordRestoreFormComponent,
  ],
  imports: [
    MatNativeDateModule,
    PickerModule,
    HttpClientModule,
    MatDialogModule,
    BrowserModule,
    RouterModule.forRoot([
      {path: 'register', component: RegisterComponent},
      {path: 'login', component: LoginComponent},
      {path: 'verify-email', component: VerifyEmailComponent},
      {path: 'main', component: MainComponent},
      {path: 'main/:chatId', component: MainComponent},
      {path: 'contacts', component: ContactsComponent},
      {path: 'profile-settings', component: ProfileSettingsComponent},
      {path: 'verify-email-note', component: VerifyEmailNoteComponent},
      {path: 'restore-password-request', component: PasswordRestoreRequestComponent},
      {path: 'restore-password-form', component: PasswordRestoreFormComponent},
      {path: 'restore-password-form/:requestId', component: PasswordRestoreFormComponent},
      {path: '', redirectTo: '/main', pathMatch: 'full'},
    ]),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: RequestHeaderInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
