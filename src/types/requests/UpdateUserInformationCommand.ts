export class UpdateUserInformationCommand {
  firstName: string;
  lastName: string;
  birthDay: string;
  website: string;
  address: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedIn: string;
  profilePicture: string;


  constructor(firstName: string, lastName: string, birthDay: string, website: string,
              address: string, facebook: string, twitter: string, instagram: string,
              linkedIn: string, profilePicture: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDay = birthDay;
    this.website = website;
    this.address = address;
    this.facebook = facebook;
    this.twitter = twitter;
    this.instagram = instagram;
    this.linkedIn = linkedIn;
    this.profilePicture = profilePicture;
  }
}
