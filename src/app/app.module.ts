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
import {VerifyPhoneComponent} from './auth/verify-phone/verify-phone.component';
import {RefreshTokenComponent} from './auth/refresh-token/refresh-token.component';
import {MainComponent} from './messenger/main/main.component';
import {ProfileSettingsComponent} from './messenger/profile-settings/profile-settings.component';
import {ContactsComponent} from './messenger/contacts/contacts.component';
import {NavigationBarComponent} from './messenger/auxiliary/navigation-bar/navigation-bar.component';
import {ReceivedMessageComponent} from './messenger/auxiliary/received-message/received-message.component';
import {ChatFooterComponent} from './messenger/auxiliary/chat-footer/chat-footer.component';
import {ChatHeaderComponent} from './messenger/auxiliary/chat-header/chat-header.component';
import {ChatSidebarHeaderComponent} from './messenger/auxiliary/chat-sidebar-header/chat-sidebar-header.component';
import {ChatItemActiveComponent} from './messenger/auxiliary/chat-item-active/chat-item-active.component';
import {GroupItemComponent} from './messenger/auxiliary/group-item/group-item.component';
import {ProfileSettingsSidebarComponent} from "./messenger/auxiliary/profile-settings-sidebar/profile-settings-sidebar.component";
import {ProfileLogoutButtonComponent} from './messenger/auxiliary/profile-logout-button/profile-logout-button.component';
import {AuthInterceptor} from "./interceptors/auth-interceptor.service";
import {ContactItemComponent} from "./messenger/auxiliary/contact-item/contact-item.component";
import { CreateGroupComponent } from './messenger/modals/create-group/create-group.component';
import { InviteOthersComponent } from './messenger/modals/invite-others/invite-others.component';
import { NotificationsComponent } from './messenger/modals/notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    VerifyEmailComponent,
    VerifyPhoneComponent,
    RefreshTokenComponent,
    MainComponent,
    ProfileSettingsComponent,
    ContactsComponent,
    NavigationBarComponent,
    ReceivedMessageComponent,
    ChatFooterComponent,
    ChatHeaderComponent,
    ChatSidebarHeaderComponent,
    ChatItemActiveComponent,
    GroupItemComponent,
    ProfileSettingsSidebarComponent,
    ProfileLogoutButtonComponent,
    ContactItemComponent,
    CreateGroupComponent,
    InviteOthersComponent,
    NotificationsComponent,
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
      {path: 'contacts', component: ContactsComponent},
      {path: 'profile-settings', component: ProfileSettingsComponent},
      {path: 'refresh-token', component: RefreshTokenComponent},
      {path: '', redirectTo: '/login', pathMatch: 'full'},
    ]),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
