import {Component, OnInit} from '@angular/core';
import {LogService} from '../../shared/log.service';
import {LogLevel} from '../../shared/log-level.enum';

@Component({
  selector: 'yl-log-test',
  templateUrl: './log-test.component.html',
  styleUrls: ['./log-test.component.scss']
})
export class LogTestComponent implements OnInit {

  constructor(private logger: LogService) {
  }

  ngOnInit(): void {
  }

  testLog() {
    this.logger.level = LogLevel.Debug;
    this.logger.debug('Test the log() Method', 'This', 'Is', 'Optional', 'Params', 1, 3);
  }

}
