import './App.css';
import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

function App() {
  const data = [
    { t: '11:23', v: 24 },
    { t: '11:24', v: 25 },
    { t: '11:25', v: 22 },
    { t: '11:26', v: 17 },
  ];


  return (
    <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="v" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="t" />
      <YAxis />
    </LineChart>
  );
}

export default App;
