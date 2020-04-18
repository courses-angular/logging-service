import {Injectable} from '@angular/core';
import {LogLevel} from './log-level.enum';
import {LogPublisher} from '../models/log-publisher';
import {LogPublishersService} from './log-publishers.service';


export class LogEntry {
  entryDate: Date = new Date();
  message: string = '';
  level: LogLevel = LogLevel.Debug;
  extraInfo: any[] = [];

  logWithDate: boolean = true;

  buildLogString(): string {
    let result = '';
    if (this.logWithDate) {
      result = this.entryDate + '; ';
    }
    result += `Type: ${LogLevel[this.level]}; `;
    result += `Message: ${this.message}; `;

    if (this.extraInfo.length > 0) {
      result += 'Extra info' + this.formatParams(this.extraInfo);
    }
    return result;
  }

  private formatParams(params: any[]): string {
    let result: string = params.join(',');

    if (params.some(param => typeof param === 'object')) {
      result = '';
      for (const item of params) {
        result += JSON.stringify(item) + ',';
      }
    }

    return result;

  }


}

@Injectable({
  providedIn: 'root'
})


export class LogService {
  level: LogLevel = LogLevel.ALL;
  logWithDate: boolean = true;
  publishers: LogPublisher[] = [];

  constructor(private publisherService: LogPublishersService) {
    //  Set all the publishers into the local array
    this.publishers = this.publisherService.publishers;
  }

  private shouldLog(level: LogLevel): boolean {
    let result: boolean = false;

    if (this.level !== LogLevel.Off && level >= this.level) {
      result = true;
    }

    return result;
  }

  debug(message: string, ...optionalParams: any[]) {
    this.writeToLog(message, LogLevel.Debug, optionalParams);
  }

  info(message: string, ...optionalParams: any[]) {
    this.writeToLog(message, LogLevel.Info, optionalParams);
  }

  warn(message: string, ...optionalParams: any[]) {
    this.writeToLog(message, LogLevel.Warn, optionalParams);
  }

  error(message: string, ...optionalParams: any[]) {
    this.writeToLog(message, LogLevel.Error, optionalParams);
  }

  fatal(message: string, ...optionalParams: any[]) {
    this.writeToLog(message, LogLevel.Fatal, optionalParams);
  }

  log(message: any, ...optionalParams: any[]) {
    this.writeToLog(message, LogLevel.ALL, optionalParams);
  }


  private writeToLog(message: string, level: LogLevel, params: any[]) {
    if (this.shouldLog(level)) {

      const entry: LogEntry = new LogEntry();
      entry.message = message;
      entry.level = level;
      entry.extraInfo = params;
      entry.logWithDate = this.logWithDate;

      // Log the value to all publishers
      for (const logger of this.publishers) {
        logger.log(entry).subscribe(response => console.log(response));
      }

    }
  }


}
