export class SendCodePayload {
  phone_number: string;
  county_code: string;
  fingerprint: string;


  constructor(phone_number: string, county_code: string, fingerprint: string) {
    this.phone_number = phone_number;
    this.county_code = county_code;
    this.fingerprint = fingerprint;
  }
}
