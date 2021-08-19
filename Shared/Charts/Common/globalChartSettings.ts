import { Options } from "highcharts";
import { allColors } from "./chartColors";
import { typography, colors, spacings } from "styles/constants";

export const theme: Options = {
  credits: { enabled: false },
  exporting: {
    buttons: {
      contextButton: {
        theme: {
          fill: "none"
        },
        menuItems: [
          "viewFullscreen",
          "printChart",
          "separator",
          "downloadPNG",
          "downloadJPEG",
          "downloadPDF" /*"downloadSVG"*/
        ]
      }
    }
  },
  loading: {
    labelStyle: {
      opacity: 0
    },
    style: {
      visibility: "none",
      color: "none",
      backgroundColor: "none"
    }
  },
  title: {
    align: "left",
    margin: 20,
    style: {
      color: colors.ColorTextBrown,
      fontSize: typography.SizeFont24
    }
  },
  subtitle: {
    style: {
      color: colors.ColorTextBrown,
      fontSize: typography.SizeFont22
    }
  },
  colors: allColors,
  chart: {
    backgroundColor: "none",
    style: {
      fontFamily: typography.FontFamilySans
    }
  },
  plotOptions: {
    series: {
      dataLabels: {
        style: {
          backgroundColor: "none",
          color: colors.ColorTextBrown,
          fontSize: "12px",
          fontFamily: typography.FontFamilySans
        }
      }
    }
  }
};
