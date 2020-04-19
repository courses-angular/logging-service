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
    let publisher: LogPublisher;
    // // Create an instance of the LogConsole Class
    // this.publishers.push(new LogConsole());
    // // Create an instance of the LogLocalStorage Class
    // this.publishers.push(new LogLocalStorage());
    // // Create an instance of the LogWebAPI Class
    // this.publishers.push(new LogWebAPI(this.http));

    this.getLoggers().subscribe(response => {
      for (const pub of response.filter(p => p.isActive)) {
        switch (pub.loggerName.toLowerCase()) {
          case 'console':
            publisher = new LogConsole();
            break;
          case 'localStorage':
            publisher = new LogLocalStorage();
            break;
          case 'webapi':
            publisher = new LogWebAPI(this.http);
            break;
        }
        // Set location,if any of the logging
        publisher.location = pub.loggerLocation;
        //  Add publisher to Publishers Array
        this.publishers.push(publisher);
      }
    });
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
