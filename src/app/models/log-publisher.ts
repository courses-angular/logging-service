import {LogEntry} from '../shared/log.service';
import {Observable, of} from 'rxjs';

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
