export class UpdateUserInformationCommand {
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
  facebook: string | null = null;
  twitter: string | null = null;
  instagram: string | null = null;
  linkedIn: string | null = null;

  static CreateEmptyCommand(): UpdateUserInformationCommand {
    return new UpdateUserInformationCommand(
      null, null, null, null, null, null, null);
  }

  constructor(firstName: string | null,
              lastName: string | null,
              displayName: string | null,
              phoneNumber: string | null,
              birthdayDate: string | null,
              email: string | null,
              username: string | null) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.displayName = displayName;
    this.phoneNumber = phoneNumber;
    this.birthdayDate = birthdayDate;
    this.email = email;
    this.username = username;
  }
}
