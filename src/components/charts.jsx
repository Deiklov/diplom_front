import React, {PureComponent} from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const data = [
    {
        name: "2016",
        TSLA: 4000,
        AAPL: 2400,
        amt: 2400,
    },
    {
        name: "2017",
        TSLA: 3000,
        AAPL: 1398,
        amt: 2210,
    },
    {
        name: "2018",
        TSLA: 2000,
        AAPL: 9800,
        amt: 2290,
    },
    {
        name: "2019",
        TSLA: 2780,
        AAPL: 3908,
        amt: 2000,
    },
    {
        name: "2020",
        TSLA: 1890,
        AAPL: 4800,
        amt: 2181,
    },
    {
        name: "2021",
        TSLA: 2390,
        AAPL: 3800,
        amt: 2500,
    },
    {
        name: "2022",
        TSLA: 3490,
        AAPL: 4300,
        amt: 2100,
    },
];

export default class ExampleCharts extends PureComponent {
    render() {
        return (
            <ResponsiveContainer width={'99%'} height={400}>
                <LineChart width={700} height={400} data={data}
                           margin={{
                               top: 5,
                               right: 30,
                               left: 20,
                               bottom: 5
                           }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line
                        type="monotone"
                        dataKey="AAPL"
                        legendType="circle"
                        stroke="#8884d8"
                        activeDot={{r: 8}}
                    />
                    <Line type="monotone" dataKey="TSLA" stroke="#82ca9d"/>
                </LineChart>
            </ResponsiveContainer>
        );
    }
}
