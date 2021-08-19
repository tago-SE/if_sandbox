import React from "react";
import Highcharts from "highcharts";
import highchartsAccessibility from "highcharts/modules/accessibility";
import more from "highcharts/highcharts-more";
import HighchartsReact from "highcharts-react-official";
import { theme } from "./Common/globalChartSettings";
import { HighchartsUtils } from "./highchartUtils";
// import './highcharts-loading.scss';

/**
 * Very solid example of syncrhonized zoom/crosshairs: http://jsfiddle.net/Gv7Tg/27/
 *
 * Load new data based on selected zoom: http://jsfiddle.net/gh/get/jquery/1.9.1/highslide-software/highcharts.com/tree/master/samples/stock/demo/lazy-loading/
 */

// // Required for arearange among other things
// more(Highstocks);

export interface ISingleStackedBarChartProps {
  series: Array<ISerie>;
  categories: Array<string>;
  loading?: boolean;

  // title?: string,
  // tooltip?: boolean,
  // legend?: boolean,
  // stacking?: string,
  // selected?: number,
  // loading?: boolean,
  // xAxis?: {
  //     floor?: number,
  //     ceiling?: number,
  // },
  // containerProps?: { [key: string]: any },
  onCreation?: (chart: any) => void;
  // onLegendItemClick?: (legend: any) => void,
  // onLegendItemMouseOver?: (legend: any) => void,
  // onLegendItemMouseOut?: (legend: any) => void,
  // onPointMouseOver?: (point: any) => void,
  // onPointMouseOut?: (point: any) => void,
  // onSeriesMouseOver?: (series: any) => void,
  // onSeriesMouseOut?: (series: any) => void,
  // synchronize?: SynchronizeOptions;
}

export interface SynchronizeOptions {
  point?: {
    charts: Array<any>;
  };
}

interface ISerie {
  name: string;
  data: Array<number>;
  [x: string]: any;
}

export const SingleStackedBarChart = ({ series, loading, categories, onCreation }: ISingleStackedBarChartProps) => {
  // const chartRef = React.useRef(null);

  // const getChart = () => chartRef.current.chart;

  const getSeries = () => (!series || loading ? undefined : series);

  const options = {
    chart: {
      type: "bar",
      height: 100
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    title: {
      text: ""
    },
    xAxis: {
      gridLineWidth: 0,
      lineWidth: 0,
      categories: categories,
      labels: {
        enabled: false
      },
      width: "100%",
      height: 50,
      crosshair: {
        color: "rgb(241, 236, 232, 0.3)",
        opacity: 0.3,
        className: "cross-hair"
      }
    },
    yAxis: {
      min: 0,
      gridLineWidth: 0,
      lineWidth: 0,
      labels: {
        enabled: false
      },
      title: {
        text: "",
        enabled: false
      }
    },
    legend: { enabled: false },
    plotOptions: {
      series: {
        stacking: "percent",
        pointWidth: 15,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          shadow: true,
          y: 50,
          formatter: function () {
            return Math.round(this.percentage * 100) / 100 + " %";
          }
        },
        states: {
          select: {
            color: "red" // ?
          }
        }
      }
    },
    series: getSeries()
  };

  // React.useLayoutEffect(() => {
  //     const chart = getChart();
  //     if (loading) {
  //         chart.showLoading();
  //         HighchartsUtils.removesSeriesFromChart(chart, false);
  //     } else {
  //         chart.hideLoading();
  //         HighchartsUtils.addLegendMouseEventsForChart(chart, onLegendItemClick, onLegendItemMouseOver, onLegendItemMouseOut);
  //     }
  // }, [loading, series]);

  // React.useEffect(() => {
  //   console.log("SimpleStackedBarChart: series changed", series);
  // }, [series]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={Highcharts.merge(options, theme)}
      // options={Highcharts.merge(options, theme)}
      //options={options}
      allowChartUpdate={true}
      // updateArgs={[true, true, true]}
      // constructorType={"stockChart"}
      // ref={chartRef}
      // containerProps={containerProps}
      callback={(chart: any) => {
        if (onCreation) {
          onCreation(chart);
        }
      }}
    />
  );
};

export default SingleStackedBarChart;
