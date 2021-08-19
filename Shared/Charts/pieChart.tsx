import React, { Component } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { allColors, selectedBlue, primaryBlue, primaryRed, primaryYellow, primaryGreen } from "./Common/chartColors";
import { HighchartsUtils } from "./highchartUtils";
import { theme } from "./Common/globalChartSettings";
// import './highcharts-loading.scss';

// import './highcharts.scss';
// Load Highcharts modules
// require("highcharts/modules/exporting")(Highcharts);

interface ValueOptions {
  name: string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

// const defaultValueOptions: ValueOptions = {
//   name: "Share",
//   decimals: 1,
//   prefix: undefined,
//   suffix: undefined,
// }

interface IData {
  name: string;
  y: number;
}
// Sync two pie charts example:
// https://jsfiddle.net/BlackLabel/rft9hbL0/1/
// TODO: note that they use setState hover

interface IProps {
  data: Array<IData>;
  containerProps?: { [key: string]: any };
  onCreation?: (chart: any) => void;
  onLegendItemClick?: (legend: any) => void;
  onLegendItemMouseOver?: (legend: any) => void;
  onLegendItemMouseOut?: (legend: any) => void;
  onMouseOverSection?: (point: any) => void;
  onMouseOutSection?: (point: any) => void;
  title?: string;
  tooltip?: boolean;
  value?: ValueOptions;
  loading?: boolean;
}

export const PieChart = ({
  data,
  title,
  loading,
  containerProps,
  onCreation,
  onLegendItemClick,
  onLegendItemMouseOver,
  onLegendItemMouseOut,
  onMouseOverSection,
  onMouseOutSection
}: IProps) => {
  const chartRef = React.useRef(null);

  const getChart = () => chartRef.current.chart;

  const series = () => {
    // To trigger the birth animation the series must start as undefined if there is no data.
    if (!data || loading) return undefined;
    return [
      {
        name: "Series-1",
        type: "pie",
        colorByPoint: true,
        allowPointSelect: true,
        slicedOffset: 5,
        states: {
          select: {
            color: selectedBlue
          }
        },
        keys: ["name", "y"],
        data: data,

        point: {}
      }
    ];
  };
  const options = {
    credits: { enabled: false },
    scrollbar: { enabled: false },
    navigator: { enabled: false },
    exporting: { enabled: false },
    chart: {
      //backgroundColor: "none",
    },
    buttons: {
      contextButton: {
        menuItems: [
          "viewFullscreen",
          "printChart",
          "separator",
          "downloadPNG",
          "downloadJPEG",
          "downloadPDF",
          "downloadSVG"
        ]
      }
    },
    title: {
      text: title
    },
    tooltip: {
      enabled: true,
      animation: true,
      followPointer: true,
      // backgroundColor: beigeBackgroundColors.dark,
      className: "chart-tooltip"
      // valuePrefix: this.props.value.prefix,
      // valueSuffix: this.props.value.suffix,
      // valueDecimals: this.props.value?.decimals
    },
    accessibility: {
      point: {
        // valueSuffix: this.props.value.suffix,
      }
    },
    series: series(),
    legend: {
      enabled: true
    },
    plotOptions: {
      pie: {
        allowPointSelect: false,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          style: { fontWeight: "italic" }
          //format: `<b>{point.name}</b>: ${this.props.value.prefix || ""}{point.percentage:.${this.props.value.decimals}f} ${this.props.value.suffix}`
        },
        showInLegend: true
      }
    }
  };

  React.useEffect(() => {
    const chart = getChart();
    if (loading) {
      chart.showLoading();
      HighchartsUtils.removesSeriesFromChart(chart, false);
    } else {
      chart.hideLoading();
      HighchartsUtils.addLegendMouseEventsForChart(
        chart,
        onLegendItemClick,
        onLegendItemMouseOver,
        onLegendItemMouseOut
      );
    }
  }, [loading, data]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={Highcharts.merge(options, theme)}
      allowChartUpdate={true}
      updateArgs={[true, true, true]}
      ref={chartRef}
      containerProps={containerProps}
      callback={(chart: any) => {
        if (onCreation) {
          onCreation(chart);
        }
      }}
    />
  );
};

export default PieChart;
