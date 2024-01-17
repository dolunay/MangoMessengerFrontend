import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { IContact } from '@shared/types/models';
import { DefaultImagePipe } from '@core/pipes/default-image.pipe';

@Component({
	selector: 'app-contact-item',
	templateUrl: './contact-item.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [DefaultImagePipe],
	standalone: true,
})
export class ContactItemComponent {
	@Input() contact: IContact = {} as IContact;
	defaultUrl = 'assets/media/avatar/3.png';
}
