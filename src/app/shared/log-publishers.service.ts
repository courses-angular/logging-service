import {Injectable} from '@angular/core';
import {LogPublisher, LogConsole} from '../models/log-publisher';

@Injectable({
  providedIn: 'root'
})
export class LogPublishersService {
  publishers: LogPublisher[] = [];

  constructor() {
    this.buildPublishers();
  }

  buildPublishers() {
    // Create an instance of the LogConsole Class

    this.publishers.push(new LogConsole());
  }
}
