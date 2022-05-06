import "./App.css";
import React from "react";
import axios from "axios";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import moment from "moment";

class App extends React.Component {
  constructor() {
    super();
    this.state = { data: [], average: "", maxTemp: "", minTemp: "" };
  }

  componentDidMount() {
    axios
      .get("/temperatures")
      .then((res) => {
        const result = res.data.temperatures;

        // Set datapoints for the line chart
        const data = result.map((item) => {
          return {
            t: moment(item.payload.data.t).format("LT"),
            v: item.payload.data.v,
          };
        });

        // Check amount of temperature data points
        let count = 0, sumTemp = 0;
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            if (data[key].hasOwnProperty("v")) {
              sumTemp += data[key].v;
              count += 1;
            }
          }
        }

        // Temperatures to array
        const arrOfTemp = result.map((item => {
          return item.payload.data.v
        }))

        const minTemp = Math.min(...arrOfTemp);
        const maxTemp = Math.max(...arrOfTemp);
        const average = sumTemp / count;

        this.setState({ data, average, maxTemp, minTemp });

      })
      .catch((err) => console.log(err));
  }
  
  render() {
    const round = (value, precision) => {
      let multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    }
    return (
      <div>
        <p>Note: This is not a real sensor, data is currently randomly generated.</p>
        <p>Temperature readings</p>
        <LineChart width={600} height={300} data={this.state.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="v" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="t" />
          <YAxis />
        </LineChart>
        <p>Average temperature: {round(this.state.average, 2)} °C</p>
        <p>Lowest temperature: {this.state.minTemp} °C</p>
        <p>Highest temperature: {this.state.maxTemp} °C</p>
      </div>

    );
  }
}

export default App;
