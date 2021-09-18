export class UpdateAccountInformationCommand {
  firstName: string | null;
  lastName: string | null;
  displayName: string | null;
  phoneNumber: string | null;
  birthdayDate: string | null;
  email: string | null;
  website: string | null = null;
  username: string | null;
  bio: string | null = null;
  address: string | null = null;

  constructor(firstName: string | null,
              lastName: string | null,
              displayName: string | null,
              phoneNumber: string | null,
              birthdayDate: string | null,
              email: string | null,
              website: string | null,
              username: string | null,
              bio: string | null,
              address: string | null) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.displayName = displayName;
    this.phoneNumber = phoneNumber;
    this.birthdayDate = birthdayDate;
    this.email = email;
    this.website = website;
    this.username = username;
    this.bio = bio;
    this.address = address;
  }
}
