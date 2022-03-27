import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  @Input() activeRoute = '';

  navigateToChats(): void {
    this.router.navigateByUrl('main').then(r => r);
  }

  navigateToContacts(): void {
    this.router.navigateByUrl('contacts').then(r => r);
  }

  navigateToSettings(): void {
    this.router.navigateByUrl('profile-settings').then(r => r);
  }
}
