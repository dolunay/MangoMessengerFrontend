import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'app-profile-logout-button',
	templateUrl: './profile-logout-button.component.html',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileLogoutButtonComponent {
	@Input() ButtonText: string = 'Logout';
}
