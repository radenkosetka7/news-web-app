import React, {useEffect, useState} from 'react';
import {Pie} from 'react-chartjs-2';
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';
import {Card} from "antd";
import './PieChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({data}) => {
    const [chartsData, setChartsData] = useState({});

    useEffect(() => {
        const groupedData = data.reduce((acc, item) => {
            if (!acc[item.attribute]) {
                acc[item.attribute] = {};
            }

            if (!acc[item.attribute][item.value]) {
                acc[item.attribute][item.value] = 0;
            }

            acc[item.attribute][item.value] += item.totalVisits;
            return acc;
        }, {});

        const charts = Object.keys(groupedData).map((attribute) => {
            const values = Object.keys(groupedData[attribute]);
            const visits = values.map((value) => groupedData[attribute][value]);

            return {
                label: attribute,
                labels: values,
                datasets: [
                    {
                        data: visits,
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                    },
                ],
            };
        });

        setChartsData(charts);
    }, [data]);

    return (
        <div className="outer-div">
            {chartsData.length > 0 && chartsData.map((chart, index) => (
                <div className="inner-div" key={index}>
                    <Card title={chart.label}>
                        <Pie data={chart}/>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default PieChart;
