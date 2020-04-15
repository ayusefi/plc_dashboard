import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

import { MydbService } from '../../../mydb.service';

@Component({
  selector: 'kt-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss']
})
export class MyPageComponent implements OnInit {

  pages = [];
  chartData = [];
  chart: am4charts.XYChart;
  

  constructor(public router: ActivatedRoute,
              private mydbb: MydbService,
              ) { }
  
  ngOnInit() {
    this.pages = this.mydbb.pages;
    
    let chart = am4core.create("kt_amcharts_7", am4charts.XYChart);

      chart.paddingRight = 40;

      let data = [];
      let data2 = [];
      let visits = 10;
      let visits2 = 10;
      for (let i = 1; i < 366; i++) {
        visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        visits2 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        data.push({ date: new Date(2019, 0, i), name: "name" + i, value: visits });
        data2.push({ date: new Date(2019, 0, i), name: "name" + i, value: visits2 });
      }


      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series1 = chart.series.push(new am4charts.LineSeries());
      series1.tooltip.disabled = false;
      series1.stroke = am4core.color("#FFC0CB"); // red
      series1.strokeWidth = 2; // 3px
      series1.dataFields.dateX = "date";
      series1.dataFields.valueY = "value";
      series1.tooltipText = "{valueY.value}";
      series1.data = data

      let series2 = chart.series.push(new am4charts.LineSeries());
      series2.tooltip.disabled = false;
      series2.strokeWidth = 2; // 3px
      series2.dataFields.dateX = "date";
      series2.dataFields.valueY = "value";
      series2.tooltipText = "{valueY.value}";
      series2.data = data2;

      chart.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series1);
      chart.scrollbarX = scrollbarX;

      this.chart = chart;
  }
}


