import {LogEntry} from '../shared/log.service';
import {Observable} from 'rxjs';

export abstract class ILogPublishers {
  location: string;

  abstract log(record: LogEntry): Observable<boolean>;
  abstract clear(): Observable<boolean>;
}
