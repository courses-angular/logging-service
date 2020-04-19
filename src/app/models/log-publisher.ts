import {LogEntry} from '../shared/log.service';
import {Observable, of, throwError} from 'rxjs';
import {HttpHeaders, HttpResponse, HttpClient, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';


export class LogPublisherConfig {
  loggerName: string;
  loggerLocation: string;
  isActive: boolean;
}

export abstract class LogPublisher {
  location: string;

  abstract log(record: LogEntry): Observable<boolean>;

  abstract clear(): Observable<boolean>;
}

export class LogConsole extends LogPublisher {

  log(record: LogEntry): Observable<boolean> {
    console.log(record.buildLogString());

    return of(true);
  }

  clear(): Observable<boolean> {
    console.clear();

    return of(true);
  }
}

export class LogLocalStorage extends LogPublisher {

  constructor() {
    super();
    this.location = 'logging';
  }

  log(record: LogEntry): Observable<boolean> {
    const result: boolean = false;
    let logEntries: LogEntry[];
    try {
      logEntries = JSON.parse(localStorage.getItem(this.location)) || [];
      // Add new log entry to the array
      logEntries.push(record);
      //  Store logEntries in LocalStorage
      localStorage.setItem(this.location, JSON.stringify(logEntries));
    } catch (exception) {
      console.log(exception);
    }

    return of(result);
  }

  clear(): Observable<boolean> {
    localStorage.removeItem(this.location);
    return of(true);
  }

  getAll(): Observable<LogEntry[]> {
    let values: LogEntry[];

    // Get all values from LocalStorage
    values = JSON.parse(localStorage.getItem(this.location)) || [];

    return of(values);
  }


}

export class LogWebAPI extends LogPublisher {
  constructor(private http: HttpClient) {
    super();

    this.location = 'http://localhost'; // Here must be an endpoint to the server
  }

  log(record: LogEntry): Observable<boolean> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.location, record, {headers}).pipe(
      map(response => response),
      catchError(this.handleErrors)
    );

  }

  clear(): Observable<boolean> {
    // TODO: call WebAPI to clear all entries on the server

    return of(true);
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
