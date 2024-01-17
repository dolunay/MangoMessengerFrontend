import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import type { IContact, IUser } from '@shared/types/models';
import { Router } from '@angular/router';
import {
	CommunitiesService,
	ContactsService,
	ErrorNotificationService,
	SessionService,
	UsersService,
	ValidationService,
} from '@core/services';
import { EMPTY, catchError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContactItemComponent, NavigationBarComponent } from '@core/messenger/auxiliary';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
	selector: 'app-contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['./contacts.component.scss'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NavigationBarComponent, ContactItemComponent, FormsModule, NgClass],
})
export class ContactsComponent implements OnInit {
	private readonly contactsService = inject(ContactsService);
	public readonly userService = inject(UsersService);
	private readonly communitiesService = inject(CommunitiesService);
	private readonly sessionService = inject(SessionService);
	private readonly router = inject(Router);
	private readonly errorNotificationService = inject(ErrorNotificationService);
	private readonly validationService = inject(ValidationService);
	private readonly destroyRef = inject(DestroyRef);

	private currentUser!: IUser;

	public contacts: IContact[] = [];
	public isLoaded = false;

	public currentOpenedContact: IUser = {} as IUser;

	public contactsSearchQuery = '';
	public contactsFilter = 'All Contacts';
	public currentOpenedUserIsContact = false;

	ngOnInit(): void {
		this.initializeView();
	}

	private initializeView(): void {
		const userId = this.sessionService.getTokens()?.userId;

		if (userId === null || userId === undefined) throw new Error('Localstorage tokens error.');

		this.contactsService.getCurrentUserContacts().subscribe((contResponse) => {
			this.contacts = contResponse.contacts;

			this.userService
				.getUserById(userId)
				.pipe(
					catchError((error) => {
						this.errorNotificationService.notifyOnError(error);
						if (error.status === 0 || error.status === 401 || error.status === 403)
							this.router.navigateByUrl('login').then((r) => r);

						return EMPTY;
					}),
					takeUntilDestroyed(this.destroyRef),
				)
				.subscribe((response) => {
					this.currentUser = response.user;
					this.currentOpenedContact = response.user;
					this.isLoaded = true;
					this.currentOpenedUserIsContact = true;
					this.contactsFilter = 'All Contacts';
					this.contactsSearchQuery = '';
				});
		});
	}

	onFilterClick(filter: string) {
		this.contactsFilter = filter;

		this.contactsService
			.getCurrentUserContacts()
			.pipe(
				catchError((error) => {
					this.errorNotificationService.notifyOnError(error);
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe((response) => {
				this.contacts = response.contacts;
				this.contactsSearchQuery = '';
			});
	}

	onUserSearchClick(): void {
		this.validationService.validateField(this.contactsSearchQuery, 'Contact Search');
		this.contactsService
			.searchContacts(this.contactsSearchQuery)
			.pipe(
				catchError((error) => {
					this.errorNotificationService.notifyOnError(error);
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe((response) => {
				this.contacts = response.contacts;
				this.contactsFilter = 'Search Results';
				this.contactsSearchQuery = '';
			});
	}

	onContactClick(contact: IContact): void {
		this.userService
			.getUserById(contact.userId)
			.pipe(
				catchError((error) => {
					this.errorNotificationService.notifyOnError(error);
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe((response) => {
				this.currentOpenedContact = response.user;
				this.currentOpenedUserIsContact = contact.isContact;
			});
	}

	onAddContactClick() {
		const contactId = this.currentOpenedContact.userId;

		this.contactsService
			.addContact(contactId)
			.pipe(
				catchError((error) => {
					this.errorNotificationService.notifyOnError(error);
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe((_) => {
				// TODO: This API call is redundant, keep contacts in memory and simply push result to array
				// TODO: Implement contacts repo
				this.onFilterClick('All Contacts');

				this.contactsSearchQuery = '';
				this.currentOpenedUserIsContact = true;
			});
	}

	onStartDirectChatClick() {
		const userId = this.currentOpenedContact.userId;

		this.communitiesService
			.createChat(userId)
			.pipe(
				catchError((error) => {
					this.errorNotificationService.notifyOnError(error);
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe((response) => {
				this.router.navigate(['main', { chatId: response.chatId }]).then((r) => r);
			});
	}

	onRemoveContactClick() {
		const userToRemoveId = this.currentOpenedContact.userId;

		this.contactsService
			.deleteContact(this.currentOpenedContact.userId)
			.pipe(
				catchError((error) => {
					this.errorNotificationService.notifyOnError(error);
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe((_) => {
				this.contacts = this.contacts.filter((x) => x.userId !== userToRemoveId);
				this.currentOpenedContact = this.currentUser;
			});
	}

	getContactItemClass = (userId: string) =>
		userId === this.currentOpenedContact.userId ? 'contacts-item active' : 'contacts-item';

	isCurrentUserOpened(): boolean {
		const tokens = this.sessionService.getTokens();
		const userId = tokens?.userId;

		return this.currentOpenedContact.userId === userId;
	}
}
