export class UpdateUserInformationCommand {
  firstName: string;
  lastName: string;
  displayName: string;
  mobileNumber: string;
  birthdayDate: string;
  email: string;
  website: string;
  username: string;
  bio: string;
  address: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedIn: string;


  constructor(firstName: string,
              lastName: string,
              displayName: string,
              mobileNumber: string,
              birthdayDate: string,
              email: string,
              website: string,
              username: string,
              bio: string,
              address: string,
              facebook: string,
              twitter: string,
              instagram: string,
              linkedIn: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.displayName = displayName;
    this.mobileNumber = mobileNumber;
    this.birthdayDate = birthdayDate;
    this.email = email;
    this.website = website;
    this.username = username;
    this.bio = bio;
    this.address = address;
    this.facebook = facebook;
    this.twitter = twitter;
    this.instagram = instagram;
    this.linkedIn = linkedIn;
  }
}
