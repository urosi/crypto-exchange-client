import { ChartDepthComponent } from './chart-depth/chart-depth.component';
import { OrderBook } from './interfaces/order-book.interface';
import { SignalrService } from './services/signalr.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  orderBook: OrderBook;

  private chartDepthComponent: ChartDepthComponent;

  @ViewChild('chartDepth') set content(content: ChartDepthComponent) {
      if (content) {
          this.chartDepthComponent = content;
      }
  }

  constructor(
    public signalRService: SignalrService
  ) { }

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.addTransferOrderBookListener();

    this.signalRService.orderBookUpdated.subscribe(
      data => {
        this.orderBook = data;
        this.chartDepthComponent?.updateChartData(data.bids, data.asks);
      });
  }
}
