import {LogEntry} from '../shared/log.service';
import {Observable} from 'rxjs';

export abstract class ILogPublisher {
  location: string;

  abstract log(record: LogEntry): Observable<boolean>;
  abstract clear(): Observable<boolean>;
}
