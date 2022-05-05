import './App.css';
import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
//import { Chart } from 'react-charts';


function App() {
  const data = [
    { time: '11:23', temp: 24 },
    { time: '11:24', temp: 25 },
    { time: '11:25', temp: 22 },
    { time: '11:26', temp: 17 },
  ];


  return (
    <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="temp" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="time" />
      <YAxis />
    </LineChart>
  );
}

export default App;
