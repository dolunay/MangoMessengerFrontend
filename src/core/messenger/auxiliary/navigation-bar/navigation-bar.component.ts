import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
	selector: 'app-navigation-bar',
	templateUrl: './navigation-bar.component.html',
	styleUrls: ['./navigation-bar.component.scss'],
	imports: [NgClass, RouterLink],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBarComponent {
	private router = inject(Router);

	@Input() activeRoute = '';

	navigateToChats(): void {
		this.router.navigateByUrl('main').then((r) => r);
	}

	navigateToContacts(): void {
		this.router.navigateByUrl('contacts').then((r) => r);
	}

	navigateToSettings(): void {
		this.router.navigateByUrl('profile-settings').then((r) => r);
	}
}
