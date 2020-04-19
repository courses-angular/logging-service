import {Component, OnInit} from '@angular/core';
import {LogService, LogEntry} from '../../shared/log.service';
import {LogLocalStorage} from '../../models/log-publisher';
import {LogLevel} from '../../shared/log-level.enum';
import {Product} from './product';

@Component({
  selector: 'yl-log-test',
  templateUrl: './log-test.component.html',
  styleUrls: ['./log-test.component.scss']
})
export class LogTestComponent implements OnInit {
  logEntries: LogEntry[];

  constructor(private logger: LogService) {
  }

  ngOnInit(): void {
  }

  getLocalStorage() {
    const tmp = this.logger.publishers.find
    (p => p.constructor.name === 'LogLocalStorage');
    if (tmp !== null) {
      const local = tmp as LogLocalStorage;
      local.getAll().subscribe(response => this.logEntries = response);
    }
  }

  testLog() {
    this.logger.level = LogLevel.Debug;
    this.logger.error('Test the log() Method', 'This', 'Is', 'Optional', 'Params', 1, 3);
  }

  clearLog() {
    this.logger.clear();
  }

  objectLog() {
    const product = new Product();
    product.productId = 1;
    product.productName = 'Milk';
    product.introductionDate = new Date();
    product.price = 12;
    product.url = 'www.milk.com';
    this.logger.error('This is a product', product);
  }
}
