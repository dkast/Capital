import React from "react";
import { LineChart } from "react-native-svg-charts";
import * as shape from "d3-shape";

export default class SparkLine extends React.PureComponent {
  render() {
    console.log(this.props.data);
    return (
      <LineChart
        style={{ height: 100, width: 200 }}
        dataPoints={this.props.data}
        fillColor={"purple"}
        shadowOffset={3}
        svg={{
          stroke: "rgb(134, 65, 244)"
        }}
        shadowSvg={{
          stroke: "rgba(134, 65, 244, 0.2)",
          strokeWidth: 5
        }}
        contentInset={{ top: 5, bottom: 5 }}
        curve={shape.curveLinear}
      />
    );
  }
}
