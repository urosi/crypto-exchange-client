import { ChartDepthComponent } from './chart-depth/chart-depth.component';
import { OrderBook } from './interfaces/order-book.interface';
import { SignalrService } from './services/signalr.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  bids = [];
  asks = [];

  @ViewChild(ChartDepthComponent) chartDepthComponent: ChartDepthComponent;

  orderBook: OrderBook;

  constructor(
    public signalRService: SignalrService
  ) {
    console.log('app.component', this.bids, this.asks);
  }

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.addTransferOrderBookListener();

    this.signalRService.orderBookUpdated.subscribe(
      data => {
        this.chartDepthComponent.updateChartData(data.lastPrice, data.bids, data.asks);
      });
  }
}
