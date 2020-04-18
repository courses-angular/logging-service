import {Injectable} from '@angular/core';
import {LogLevel} from './log-level.enum';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  level: LogLevel = LogLevel.ALL;
  logWithDate: boolean = true;

  constructor() {
  }

  private shouldLog(level: LogLevel): boolean {
    let result: boolean = false;

    if (this.level !== LogLevel.Off && level >= this.level) {
      result = true;
    }

    return result;
  }

  private writeToLog(message: string, level: LogLevel) {
    if (this.shouldLog(level)) {
      let valueToLog: string = '';
      //  Build Log string

      if (this.logWithDate) {
        valueToLog = new Date() + '-';
      }
      valueToLog += `Type: ${LogLevel[level]} `;
      valueToLog += `Message: ${JSON.stringify(message)} `;

      //  Log the value

      console.log(valueToLog);

    }
  }

  log(message: any) {
    this.writeToLog(message, LogLevel.ALL);
  }
}
