import React from 'react'
import "./chart.css"
import { LineChart, Line, XAxis,  CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Chart({title,data,dataKey,grid}) {    
    return (
        <div className='chart'>
            <h3 className="classTitle">
                {title}
            </h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={data}>
                    <XAxis dataKey="name" stroke='#5550bd'></XAxis>
                    <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
                    <Tooltip/>
                    {grid && <CartesianGrid stroke='#eaede8' strokeDasharray="5 5"/>}
                    <Legend/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
