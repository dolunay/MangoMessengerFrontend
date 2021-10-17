import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from "../../../services/session.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../../services/users.service";
import {IUser} from "../../../../types/models/IUser";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-profile-settings-sidebar',
  templateUrl: './profile-settings-sidebar.component.html'
})
export class ProfileSettingsSidebarComponent implements OnInit, OnDestroy {

  constructor(private sessionService: SessionService,
              private userService: UsersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(data => {
      this.user = data;
      this.isLoaded = true;
    });

    this.subscriptions.push(this.eventsSubscription);
  }

  user: IUser = {
    address: "",
    bio: "",
    birthdayDate: "",
    displayName: "",
    email: "",
    facebook: "",
    firstName: "",
    instagram: "",
    lastName: "",
    linkedIn: "",
    phoneNumber: "",
    pictureUrl: "",
    publicKey: 0,
    twitter: "",
    userId: "",
    username: "",
    website: ""
  }

  @Input() events!: Observable<IUser>;
  subscriptions: Subscription[] = [];

  isLoaded = false;

  private eventsSubscription!: Subscription;

  logout(): void {
    let refreshToken = this.sessionService.getRefreshToken();
    let deleteSession = this.sessionService.deleteSession(refreshToken)
      .subscribe((_) => {
        this.sessionService.clearAccessToken();
        this.sessionService.clearRefreshToken();
        this.sessionService.clearUserId();
        this.router.navigateByUrl('login').then(r => r);
      }, _ => {
        this.sessionService.clearAccessToken();
        this.sessionService.clearRefreshToken();
        this.sessionService.clearUserId();
        this.router.navigateByUrl('login').then(r => r);
      });

    this.subscriptions.push(deleteSession);
  }

  logoutAll(): void {
    let refreshToken = this.sessionService.getRefreshToken();
    let deleteAllSub = this.sessionService.deleteAllSessions(refreshToken)
      .subscribe((_) => {
        this.sessionService.clearAccessToken();
        this.sessionService.clearRefreshToken();
        this.sessionService.clearUserId();
        this.router.navigateByUrl('login').then(r => r);
      }, _ => {
        this.sessionService.clearAccessToken();
        this.sessionService.clearRefreshToken();
        this.sessionService.clearUserId();
        this.router.navigateByUrl('login').then(r => r);
      });

    this.subscriptions.push(deleteAllSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
