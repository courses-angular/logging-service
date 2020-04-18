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
