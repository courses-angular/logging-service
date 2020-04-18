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

  private writeToLog(message: string, level: LogLevel, params: any[]) {
    if (this.shouldLog(level)) {
      let valueToLog: string = '';
      //  Build Log string

      if (this.logWithDate) {
        valueToLog = new Date() + '-';
      }
      valueToLog += `Type: ${LogLevel[level]} `;
      valueToLog += `Message: ${JSON.stringify(message)} `;
      valueToLog += `Extra Info: ${this.formatParams(params)} `;

      //  Log the value

      console.log(valueToLog);

    }
  }


}
