import {Component, OnInit} from '@angular/core';
import {LogService} from '../../shared/log.service';
import {LogLevel} from '../../shared/log-level.enum';
import {Product} from './product';

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
    this.logger.log('This is a product', product);
  }
}
