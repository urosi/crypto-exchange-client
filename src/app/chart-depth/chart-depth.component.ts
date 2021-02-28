import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { depthOptions } from './depthOptions';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart-depth',
  templateUrl: './chart-depth.component.html'
})
export class ChartDepthComponent {
  HighCharts = Highcharts;

  isLoading = true;
  updateChart = false;
  chartOptions = depthOptions;

  updateChartData(bids: any, asks: any): void {
    this.chartOptions.series[0].data = bids;
    this.chartOptions.series[1].data = asks;
    this.updateChart = true;
  }
}
