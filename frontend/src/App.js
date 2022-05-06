import "./App.css";
import React from "react";
import axios from "axios";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

class App extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  componentDidMount() {
    axios
      .get("/temperatures")
      .then((res) => {
        const result = res.data.temperatures;
        const data = result.map((item) => {
          return {
            t: item.payload.data.t,
            v: item.payload.data.v,
          };
        });
        this.setState({ data });
      })
      .catch((err) => console.log(err));
  }
  /* const data = [
    { t: '11:23', v: 24 },
    { t: '11:24', v: 25 },
    { t: '11:25', v: 22 },
    { t: '11:26', v: 17 }
  ];*/

  render() {
    return (
      <div>
        <p>Temperature readings</p>
        <LineChart width={600} height={300} data={this.state.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="v" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="t" />
          <YAxis />
        </LineChart>
      </div>
    );
  }
}

export default App;
