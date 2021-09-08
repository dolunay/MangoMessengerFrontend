export class UpdateUserSocialsCommand {
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  linkedIn: string | null;

  constructor(facebook: string | null,
              twitter: string | null,
              instagram: string | null,
              linkedIn: string | null) {
    this.facebook = facebook;
    this.twitter = twitter;
    this.instagram = instagram;
    this.linkedIn = linkedIn;
  }
}
