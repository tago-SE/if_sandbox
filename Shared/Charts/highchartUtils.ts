export class HighchartsUtils {
  static removesSeriesFromChart(chartRef: any, redraw: boolean) {
    while (chartRef.series.length) {
      chartRef.series[0].remove(redraw);
    }
  }

  static setupCallbackForElement(
    element: any,
    arg: any,
    event: "mouseover" | "mouseout" | "click",
    callback: (arg: any) => void
  ) {
    if (!element) return;
    // How to destory this callback and is it necessary?
    element.on(event, function () {
      if (callback) {
        return callback(arg);
      }
    });
  }

  static addLegendMouseEventsForChart(
    chartRef: any,
    onLegendItemClick: (legendItem: any) => void,
    onLegendItemMouseOver: (legendItem: any) => void,
    onLegendItemMouseOut: (legendItem: any) => void
  ) {
    chartRef?.legend.allItems.forEach((legendItem: any) => {
      const legendElement = legendItem.legendItem;
      this.setupCallbackForElement(legendElement, legendItem, "mouseover", onLegendItemMouseOver);
      this.setupCallbackForElement(legendElement, legendItem, "mouseout", onLegendItemMouseOut);
      this.setupCallbackForElement(legendElement, legendItem, "click", onLegendItemClick);
    });
  }

  static removeLegendMouseEventsForChart(chartRef: any) {
    // Is this necessary to remove the above event handlers ???
  }
}

export default HighchartsUtils;
