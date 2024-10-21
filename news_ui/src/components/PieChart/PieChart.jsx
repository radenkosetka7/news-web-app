import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {Card, Col, Row} from "antd";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
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
        <div style={{paddingTop:"10px"}}>
            {chartsData.length > 0 && chartsData.map((chart, index) => (
                <div style={{paddingBottom:"10px"}} key={index}>
                        <Card title={chart.label}>
                            <Pie data={chart}/>
                        </Card>
                </div>
            ))}
        </div>
    );
};

export default PieChart;
