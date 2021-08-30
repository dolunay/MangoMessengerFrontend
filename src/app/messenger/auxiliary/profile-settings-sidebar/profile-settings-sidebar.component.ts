import {Component, Input, OnInit} from '@angular/core';
import {SessionService} from "../../../services/session.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../../services/users.service";
import {IGetUserResponse} from "../../../../types/responses/IGetUserResponse";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-profile-settings-sidebar',
  templateUrl: './profile-settings-sidebar.component.html',
  styleUrls: ['./profile-settings-sidebar.component.scss']
})
export class ProfileSettingsSidebarComponent implements OnInit {

  constructor(private sessionService: SessionService,
              private userService: UsersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  private eventsSubscription!: Subscription;

  @Input() events!: Observable<void>;

  birthdayDate = '';
  phoneNumber = '';
  email = '';
  website = '';
  address = '';
  facebook = '';
  twitter = '';
  instagram = '';
  linkedIn = '';
  firstName = '';
  lastName = '';

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(() => this.initializeView());
    this.initializeView();
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  initializeView(): void {
    this.userService.getCurrentUser().subscribe((data: IGetUserResponse) => {
      this.birthdayDate = data.user.birthdayDate;
      this.phoneNumber = data.user.phoneNumber;
      this.email = data.user.email;
      this.website = data.user.website;
      this.address = data.user.address;
      this.facebook = data.user.facebook;
      this.twitter = data.user.twitter;
      this.instagram = data.user.instagram;
      this.linkedIn = data.user.linkedIn;
      this.firstName = data.user.firstName;
      this.lastName = data.user.lastName;
    }, error => {
      alert(error.message);
    })
  }

  logout(): void {
    let refreshToken = this.sessionService.getRefreshToken();
    this.sessionService.deleteSession(refreshToken)
      .subscribe((_) => {
        this.sessionService.clearAccessToken();
        this.sessionService.clearRefreshToken();
        this.router.navigateByUrl('login').then(r => r);
      }, _ => {
        this.sessionService.clearAccessToken();
        this.sessionService.clearRefreshToken();
        this.router.navigateByUrl('login').then(r => r);
      })
  }

  logoutAll(): void {
    let refreshToken = this.sessionService.getRefreshToken();
    this.sessionService.deleteAllSessions(refreshToken)
      .subscribe((_) => {
        this.sessionService.clearAccessToken();
        this.sessionService.clearRefreshToken();
        this.router.navigateByUrl('login').then(r => r);
      }, _ => {
        this.sessionService.clearAccessToken();
        this.sessionService.clearRefreshToken();
        this.router.navigateByUrl('login').then(r => r);
      })
  }

}
