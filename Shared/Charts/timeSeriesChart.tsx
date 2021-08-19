import React from "react";
import { default as Highstocks } from "highcharts/highstock";
import Highcharts, {
  RangeSelectorOptions,
  RangeSelectorButtonsOptions,
  RangeSelectorButtonTypeValue
} from "highcharts";
import highchartsAccessibility from "highcharts/modules/accessibility";
import { default as exportingHighcharts } from "highcharts/modules/exporting";
import more from "highcharts/highcharts-more";
import HighchartsReact from "highcharts-react-official";
import { theme } from "./Common/globalChartSettings";
import { HighchartsUtils } from "./highchartUtils";
// import "./highcharts-loading.scss";
import { HorizontalLoader } from "../Loaders/HorizontalLoader";

import * as styles from "./highcharts.module.scss";

/**
 * Very solid example of syncrhonized zoom/crosshairs: http://jsfiddle.net/Gv7Tg/27/
 *
 * Load new data based on selected zoom: http://jsfiddle.net/gh/get/jquery/1.9.1/highslide-software/highcharts.com/tree/master/samples/stock/demo/lazy-loading/
 */
const opt: Highcharts.Options = undefined;

if (typeof Highcharts === "object") {
  highchartsAccessibility(Highstocks);
  exportingHighcharts(Highstocks);
  more(Highstocks);
}

// Required for arearange among other things

/*
toggleDateRange(input: TimeRangeOptions) {
        const modifyChartDateRange = (chart: any) => {
            //let newPieData = [];

            let buttons = chart.rangeSelector?.buttons;
            // console.log("Chart", chart);
            if (!buttons) return;
            // This will click the zoom button for the chart if they have matching textContent 
            for (let i = 0; i < buttons.length; i++) {
                let button = buttons[i];
                if (button.element.textContent === input) {
                    button.element.onclick();
                    // After the date range button has been pressed we can extraxt the min max timestamps from the current chart.
                    // And apply it to the summary chart
                    // if (newPieData.length === 0) {
                    //     const {min, max} = chart.xAxis[0].getExtremes();
                    //     console.log("MIN, MAX", min, max);
                    //     console.log("MinDate: BEFORE", new Date(min));
                    //     newPieData = this.data.values.filter(value => true);
                    //     console.log("new pie data", newPieData);
                    // }
                    return;
                }
            }
            throw new Error(`Option is not supported in this chart configuration: ${input}`);
        }
        for (let i = 0; i < this.charts.length; i++) {
            let storedChart = this.charts[i];
            modifyChartDateRange(storedChart.reference);
        }
        // Debug or useful we'll see...
        this.refreshMinMaxTimestamp();
        this.updateCallsSummaryData();
        this.currentRangeSelection = input;
    }
    */
export interface SynchronizeOptions {
  point?: {
    charts: Array<any>;
  };
}

interface ISeries {
  name: string;
  id: string;
  type?: string;
  data: Array<any>;
  [x: string]: any;
}

interface IRangeSelectorButtonOptionsExt extends RangeSelectorButtonsOptions {
  type?: RangeSelectorButtonTypeValue;
  count?: number;
  text?: string;
  title?: string;
}

export interface IRangeSelectorOptionsExt extends RangeSelectorOptions {
  enabled?: boolean;
  selected?: number;
  buttons?: Array<IRangeSelectorButtonOptionsExt>;
}

export interface TimeOptions extends Highcharts.TimeOptions {
  timezoneOffset?: number;
  useUTC?: boolean;
}

export interface ITimeSeriesProps {
  series: Array<ISeries>;
  title?: string;
  tooltip?: boolean;
  legend?: boolean;
  stacking?: string;
  loading?: boolean;
  exporting?: boolean;
  time?: TimeOptions;
  xAxis?: {
    floor?: number;
    ceiling?: number;
  };
  rangeSelector?: IRangeSelectorOptionsExt | any;
  containerProps?: { [key: string]: any };
  onCreation?: (chart: any) => void;
  onLegendItemClick?: (legend: any) => void;
  onLegendItemMouseOver?: (legend: any) => void;
  onLegendItemMouseOut?: (legend: any) => void;
  onPointMouseOver?: (point: any) => void;
  onPointMouseOut?: (point: any) => void;
  onSeriesMouseOver?: (series: any) => void;
  onSeriesMouseOut?: (series: any) => void;
  synchronize?: SynchronizeOptions;
}

/*
credits: { enabled: false },
    scrollbar: { enabled: false },
    navigator: { enabled: false },
    exporting: { enabled: false },
    rangeSelector: {
        selected: -1
      },
  
      title: {
        text: 'Bandwidth consumption'
      },
      tooltip: {
        positioner: function() {
            return { x: this.chart.chartWidth - this.label.width, y: 10 };
          },
      },
      legend: {
          enabled: true,
      },
      series: [{
        name: 'Bandwidth',
        data: [],
        tooltip: {
          valueDecimals: 2
        }
    }],
*/
/*
 series: [{
     data: [],
     pointInterval: 36e5 // one hour // you set pointStart and the interval...
     pointStart: Date.UTC(2013, 0, 1),
 }]
*/
export const TimeSeriesChart = ({
  series,
  title,
  time,
  loading,
  stacking,
  exporting = false,
  legend = true,
  xAxis,
  rangeSelector,
  containerProps,
  onCreation,
  onLegendItemClick,
  onLegendItemMouseOver,
  onLegendItemMouseOut,
  onPointMouseOver,
  onPointMouseOut,
  onSeriesMouseOver,
  onSeriesMouseOut,
  synchronize
}: ITimeSeriesProps) => {
  const chartRef = React.useRef(null);

  const getChart = () => chartRef.current.chart;

  const getSeries = () => (!series || loading ? undefined : series);

  const syncrhonizedPointCharts = () => {
    return synchronize?.point?.charts?.filter((chart) => chart !== chartRef.current.chart) || [];
  };

  const pointsMatchOnXAxis = (p1: any, p2: any) => {
    if (!p1 || !p2) return false;
    return p1.x === p2.x;
  };

  const findMatchingPoint = (targetPoint: any, points: Array<any>) => {
    if (targetPoint.index < points.length) {
      let pointAtIndex = points[targetPoint.index];
      if (pointsMatchOnXAxis(targetPoint, pointAtIndex)) {
        return pointAtIndex;
      }
    }
    return points.find((point) => pointsMatchOnXAxis(targetPoint, point));
  };

  const showPointHoverOnOtherCharts = (triggeringPoint: any, syncrhonizedCharts: Array<any>) => {
    for (let i = 0; i < syncrhonizedCharts.length; i++) {
      let chartToSync = syncrhonizedCharts[i];
      const { series = [], xAxis = [] } = chartToSync;
      if (series.length === 0) {
        return;
      }
      const updatedPoints = [];
      const visibleSeries = series.filter((serie: any) => serie.visible);
      for (let j = 0; j < visibleSeries.length; j++) {
        let points = visibleSeries[i].points;
        let point = findMatchingPoint(triggeringPoint, points);
        if (point) {
          updatedPoints.push(point);
        }
      }
      if (updatedPoints.length > 0) {
        chartToSync.xAxis[0].drawCrosshair(triggeringPoint, updatedPoints[0]);
        chartToSync.tooltip.refresh(updatedPoints);
      }
    }
  };

  const hidePointHoverOnOtherCharts = (syncrhonizedCharts: Array<any>) => {
    for (let i = 0; i < syncrhonizedCharts.length; i++) {
      let chartToSync = syncrhonizedCharts[i];
      chartToSync.xAxis[0].hideCrosshair();
      chartToSync.tooltip.hide();
    }
  };

  /**
   * syncrhonizes inputRange.buttons between charts provided they have the same name.
   * @param clickedButton
   * @param event
   */
  // const onSynchronizedTimeRangeClickEvent = (clickedButton: any, event: any) => {
  //   if (!event) return;
  //   const charts = syncrhonizedPointCharts();
  //   console.log("BUTTON CHARTS TO SYNC: ", charts);
  //   // console.log("OnSyncChart:", chartRef.current.chart.title.textStr);
  //   // const clickedButtonLabel = clickedButton?.text;
  //   // //console.log("ClickedButtonText", clickedButtonLabel, clickedButton, event);
  //   for (let j = 0; j < charts.length; j++) {
  //     console.log(`"loopChart: "`, charts[j].title.textStr);

  //     //
  //     //     const chart = charts[j];
  //     //     const buttons = chart.rangeSelector?.buttons;
  //     //     if (!buttons) {
  //     //         //console.log("No buttons");
  //     //         return;}
  //     //     for (let i = 0; i < buttons.length; i++) {
  //     //         const { textStr, element } = buttons[i];
  //     //         //console.log("textStr", textStr);
  //     //         if (textStr === clickedButtonLabel) {
  //     //             console.log("clicked chart: ", charts[j].title.textStr);
  //     //             element.onclick(undefined);
  //     //         }
  //     //     }
  //   }
  // };

  /**
   * Add click event callback to input buttons
   */
  // const syncrhonizeTimeRangeButtonsClick = () => {
  //   const rangeSelectorButtons = rangeSelector?.buttons || [];
  //   for (let i = 0; i < rangeSelectorButtons.length; i++) {
  //     const button = rangeSelectorButtons[i];
  //     if (button.events) {
  //       const callback = button.events.click;
  //       button.events = {
  //         click: function (event: any) {
  //           if (event) {
  //             console.log("clicked", event);
  //             onSynchronizedTimeRangeClickEvent(this, event);
  //             if (callback) callback(event);
  //           }
  //         }
  //       };
  //     } else {
  //       button.events = {
  //         click: function (event: any) {
  //           console.log("clicked", event);
  //           if (event) onSynchronizedTimeRangeClickEvent(this, event);
  //         }
  //       };
  //     }
  //   }
  // };

  // if (synchronize && rangeSelector?.buttons?.length > 0) {
  //     // We clone it because each rangeSelector must be a unique reference for the button sync to work properly
  //     rangeSelector = Object.assign({}, rangeSelector);
  //     syncrhonizeTimeRangeButtonsClick();
  // }

  const options = {
    scrollbar: { enabled: false },
    navigator: { enabled: false },
    exporting: {
      enabled: exporting
    },
    rangeSelector: rangeSelector,
    chart: {},
    title: {
      text: title
    },
    subtitle: {
      text: undefined
    },
    caption: {
      text: undefined
    },
    accessibility: {
      description: "Range: Jul 1st 2009 to Jul 31st 2009", // TODO
      enabled: true
    },
    time: time,

    // TODO: STYLES ARE NOT APPLIED
    legend: {
      enabled: legend,

      style: {
        fontSize: 16 + "px",
        // color: if_color.colorLightBrownText,
        color: "red",
        backgroundColor: "blue"
        //   backgroundColor: "red",
        //   fontFamily: fontFamily,
      }
    },
    // tooltip: {
    //     formatter: function () {
    //         // The first returned item is the header, subsequent items are the points
    //         console.log("formatter", this);
    //         const tooltip = '<br><span style="color:' + "red" + '">' + this.series.name + '</span>: '; // this.series.color
    //         return tooltip;
    //         // return [moment.unix( this.x / 1000).format("LLL")].concat(
    //         //     this.points.map(function (point) {
    //         //         return "<span style='color:" + point.series.color + "'>\u25CF</span> " + point.series.name + ': ' + point.y;
    //         //     })
    //         // );
    //     }
    // },
    xAxis: {
      // Propsed solution: use invisible series
      // http://jsfiddle.net/efej646r/2/
      type: "datetime",
      title: "Date",
      // tickInterval: 3,
      // pointEnd: 1593205200000,
      // min: 1578114000000,
      // max: 1593205200000,

      // allowZoomOutside: true,

      floor: xAxis?.floor, // <-- this method works but is not animated
      ceiling: xAxis?.ceiling,

      // floor: 1578114000000,
      // ceiling: 1593205200000 ,
      // startOnTick: true,
      // min: 1572114000000,
      // pointStart: 1578114000000,
      // startOnTick: false,
      accessibility: {
        rangeDescription: undefined, // in case you wish to override the default range description
        description: "some description",
        enabled: true
      },
      xAxis: {
        crosshair: {
          className: "crosshair-cursor",
          color: "#e8e0d9",
          dashStyle: "Solid",
          lineWidth: 3
        }
      }
    },
    yAxis: {
      // events: {
      //     afterSetExtremes: function() {
      //         console.log("afterSetExtremes", this);
      //         console.log("chart is zoomed?", this.chart.options.chart.isZoomed);
      //         // Compute a reasonable tick interval given the zoom range -
      //         // have to compute this since we set the tickIntervals in order
      //         // to get predictable synchronization between 3 charts with
      //         // different data.
      //         const computeTickInterval = (xMin, xMax) => {
      //             let zoomRange = xMax - xMin;
      //             if (zoomRange <= 2) return 0.5;
      //             if (zoomRange < 20) return 1;
      //             else if (zoomRange < 50) return 3;
      //             else return 5;
      //         }
      //             const xMin = this.chart.xAxis[0].min;
      //             const xMax = this.chart.xAxis[0].max;
      //             const zmRange = computeTickInterval(xMin, xMax);
      //             const charts = syncrhonizedPointCharts();
      //             for (let i = 0; i < charts.length; i++) {
      //                 const chart = charts[i];
      //                 if (!chart) continue
      //                 chart.xAxis[0].options.tickInterval = zmRange;
      //                 chart.xAxis[0].isDirty = true;
      //                 chart.options.chart.isZoomed = true;
      //                 chart.xAxis[0].setExtremes(xMin, xMax, true);
      //             }
      //             // chart1.xAxis[0].options.tickInterval =zmRange;
      //             // chart1.xAxis[0].isDirty = true;
      //             // chart2.xAxis[0].options.tickInterval = zmRange;
      //             // chart2.xAxis[0].isDirty = true;
      //             // chart3.xAxis[0].options.tickInterval = zmRange;
      //             // chart3.xAxis[0].isDirty = true;
      //             // chart2.options.chart.isZoomed = true;
      //             // chart3.options.chart.isZoomed = true;
      //             // chart2.xAxis[0].setExtremes(xMin, xMax, true);
      //             // chart3.xAxis[0].setExtremes(xMin, xMax, true);
      //             //     chart2.options.chart.isZoomed = false;
      //             // chart3.options.chart.isZoomed = false;
      //     }
      // }
    },
    plotOptions: {
      column: {
        stacking: stacking
      },
      area: {
        stacking: stacking,
        lineWidth: 1,
        fillOpacity: 0.5,
        marker: {
          lineWidth: 0
        }
      },
      series: {
        cursor: "pointer",
        point: {
          events: {
            mouseOver: function () {
              if (onPointMouseOver) onPointMouseOver(this);
              showPointHoverOnOtherCharts(this, syncrhonizedPointCharts());
            },
            mouseOut: function () {
              if (onPointMouseOut) onPointMouseOut(this);
            }
          }
        },
        events: {
          mouseOver: function () {
            if (onSeriesMouseOver) onSeriesMouseOver(this);
          },
          mouseOut: function () {
            if (onSeriesMouseOut) onSeriesMouseOut(this);
            hidePointHoverOnOtherCharts(syncrhonizedPointCharts());
          }
        }
      }
    },
    series: getSeries()
  };

  React.useEffect(() => {
    const chart = getChart();
    if (loading) {
      chart.showLoading();
      HighchartsUtils.removesSeriesFromChart(chart, false);
    } else {
      chart.hideLoading();
      //HighchartsUtils.addLegendMouseEventsForChart(chart, onLegendItemClick, onLegendItemMouseOver, onLegendItemMouseOut); // don't remeber 
    }
  }, [loading, series]);

  // React.useEffect(() => {
  //   console.log("timeSeriesChart (debug): X-AXIS Changed");
  // }, [xAxis]);

  // // React.useEffect(() => {
  // //   // NOT SURE IF NECESSARY
  // //   console.log("timeSeries.SyncCharts", synchronize?.point.charts);
  // // }, [synchronize?.point.charts]);

  return (
    <div className={styles.chartContainer}>
      <HighchartsReact
        highcharts={Highstocks}
        options={Highcharts.merge(options, theme)}
        allowChartUpdate={true}
        updateArgs={[true, true, true]}
        constructorType={"stockChart"}
        ref={chartRef}
        containerProps={containerProps}
        callback={(chart: any) => {
          if (onCreation) {
            onCreation(chart);
          }
        }}
      />
      <div className={styles.chartOverlay}>
        <HorizontalLoader loading={loading} color="blue" size="small" />
      </div>
    </div>
  );
};

export default TimeSeriesChart;
