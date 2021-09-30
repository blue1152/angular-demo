import { ErrorHandler, Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

declare let gtag: Function;

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  handleError(error: Error | HttpErrorResponse) {
    if (!navigator.onLine) {
      console.error("Browser Offline!");
    } else {
      if (error instanceof HttpErrorResponse) {
        if (!navigator.onLine) {
          console.error("Browser Offline!");
        } else {
          // Handle Http Error (4xx, 5xx, ect.)
          console.error("Http Error!");
        }
      } else {
        // Handle Client Error (Angular Error, ReferenceError...)
        console.error("Client Error!");
      }
      console.error(error);
    }
    gtag('event', 'exception', {
      'description': error,
      'fatal': false
    });
  }
}
