import {Injectable} from '@angular/core';
import {LogPublisher, LogConsole, LogLocalStorage, LogWebAPI, LogPublisherConfig} from '../models/log-publisher';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

const PUBLISHERS_FILE = 'assets/log-publishers.json';

@Injectable({
  providedIn: 'root'
})
export class LogPublishersService {
  publishers: LogPublisher[] = [];

  constructor(private http: HttpClient) {
    this.buildPublishers();
  }

  buildPublishers() {
    // Create an instance of the LogConsole Class
    this.publishers.push(new LogConsole());
    // Create an instance of the LogLocalStorage Class
    this.publishers.push(new LogLocalStorage());
    // Create an instance of the LogWebAPI Class
    this.publishers.push(new LogWebAPI(this.http));
  }

  getLoggers(): Observable<LogPublisherConfig[]> {
    return this.http.get(PUBLISHERS_FILE).pipe(
      map(response => response),
      catchError(this.handleErrors)
    );
  }

  private handleErrors(error: HttpErrorResponse): Observable<any> {
    const errors: string[] = [];
    let message = '';
    message = 'Status:' + error.status;
    message = 'Status text:' + error.statusText;
    if (error) {
      message += '-Exception message' + error.message;
    }
    errors.push(message);
    console.error('An error occurred', errors);

    return throwError(errors);


  }
}
