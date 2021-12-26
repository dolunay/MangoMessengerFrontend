export class UpdateAccountInformationCommand {
  birthdayDate: string | null;
  website: string | null = null;
  username: string | null;
  bio: string | null = null;
  address: string | null = null;
  displayName: string | null;

  constructor(birthdayDate: string | null,
              website: string | null = null,
              username: string | null,
              bio: string | null = null,
              address: string | null = null,
              displayName: string | null) {
    this.birthdayDate = birthdayDate;
    this.website = website;
    this.username = username;
    this.bio = bio;
    this.address = address;
    this.displayName = displayName;
  }
}
