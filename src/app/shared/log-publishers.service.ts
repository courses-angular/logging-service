import {Injectable} from '@angular/core';
import {LogPublisher, LogConsole, LogLocalStorage} from '../models/log-publisher';

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
    // Create an instance of the LogLocalStorage Class
    this.publishers.push(new LogLocalStorage());
  }
}
