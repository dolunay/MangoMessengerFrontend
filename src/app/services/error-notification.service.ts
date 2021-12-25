import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ErrorNotificationService {
  notifyOnError(error: any): void {
    if (error.status === 0) {
      alert("Cannot connect to the server. Response code: 0.");
      return;
    }

    if (error.status === 409) {
      alert(error.error.errorDetails);
      return;
    }

    if (error.status === 400) {
      alert(error.error.ErrorMessage);
      return;
    }
  }
}
