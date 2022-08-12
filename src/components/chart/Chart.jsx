import React from 'react'
import "./chart.scss";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Chart({aspect, title}) {
    const data = [
        {name: "January", total: 1200},
        {name: "February", total: 800},
        {name: "March", total: 367},
        {name: "April", total: 254},
        {name: "May", total: 456},
        {name: "June", total: 345},
        {name: "July", total: 700},
        {name: "August", total: 1133},
        {name: "September", total: 966},
        {name: "October", total: 234},
        {name: "November", total: 356},
        {name: "December", total: 899},
      ];
    
  return (
    <div className='chart'>
        <div className="title">{title}</div>
        <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart width={730} height={250} data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke='gray'/>
            {/* <YAxis /> */}
            <CartesianGrid strokeDasharray="3 3" className='chartGrid'/>
            <Tooltip />
            <Area type="monotone" dataKey="total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
            </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}
