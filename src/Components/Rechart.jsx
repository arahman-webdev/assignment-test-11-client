import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const Rechart = ({ data }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-center mb-4">Booking Price Overview</h2>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart width={100} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar barSize={30} dataKey="dailyPrice" fill="#4caf50" />
          
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Rechart;
