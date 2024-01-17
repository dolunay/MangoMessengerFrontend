import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-verify-email-note',
	templateUrl: './verify-email-note.component.html',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmailNoteComponent {}
