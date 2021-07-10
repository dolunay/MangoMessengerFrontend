export class SendCodeResponse {
  phone_number: string;
  country_code: string;
  phone_code_hash: string;
  is_new: boolean;


  constructor(phone_number: string, country_code: string, phone_code_hash: string, is_new: boolean) {
    this.phone_number = phone_number;
    this.country_code = country_code;
    this.phone_code_hash = phone_code_hash;
    this.is_new = is_new;
  }
}
