import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from "../../../services/session.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../../services/users.service";
import {IUser} from "../../../../types/models/IUser";
import {Observable, Subscription} from "rxjs";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";

@AutoUnsubscribe()
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

  protected eventsSubscription$!: Subscription;
  protected deleteSessionSub$!: Subscription;
  protected deleteAllSessionsSub$!: Subscription;

  public isLoaded = false;
  public user: IUser = {
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
    pictureUrl: "",
    publicKey: 0,
    twitter: "",
    userId: "",
    username: "",
    website: ""
  }

  @Input() events$!: Observable<IUser>;

  ngOnInit(): void {
    this.eventsSubscription$ = this.events$.subscribe(data => {
      this.user = data;
      this.isLoaded = true;
    });
  }

  logout(): void {
    let refreshToken = this.sessionService.getRefreshToken();
    this.deleteSessionSub$ = this.sessionService.deleteSession(refreshToken).subscribe(_ => {
      this.clearTokens();
      this.router.navigateByUrl('login').then(r => r);
    }, _ => {
      this.clearTokens();
      this.router.navigateByUrl('login').then(r => r);
    });
  }

  logoutAll(): void {
    this.deleteAllSessionsSub$ = this.sessionService.deleteAllSessions().subscribe(_ => {
      this.clearTokens();
      this.router.navigateByUrl('login').then(r => r);
    }, _ => {
      this.clearTokens();
      this.router.navigateByUrl('login').then(r => r);
    });
  }

  private clearTokens = () => {
    this.sessionService.clearAccessToken();
    this.sessionService.clearRefreshToken();
    this.sessionService.clearUserId();
  }

  ngOnDestroy(): void {
  }
}
