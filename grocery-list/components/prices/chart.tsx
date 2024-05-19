"use client"

import { ProductChartData } from "@/app/lib/definitions";
import { formatDateToLocal } from "@/app/lib/utils"
import { Card, CardBody } from "@nextui-org/react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
export default function ProductChart({ chartData }: { chartData: ProductChartData[] }) {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top' as const,
            },
            title: {
                display: false,
            },
            color: ['primary']
        },
    };

    const labels = chartData.map((p) => formatDateToLocal(p.buy_dt));

    const data = {
        labels,
        datasets: [
            {
                data: chartData.map((p) => p.price),
                borderColor: 'violet',
                backgroundColor: 'violet',
            },
        ],
    };

    return (
        <Card className="bg-white">
            <CardBody>
                <Line options={options} data={data} />
            </CardBody>
        </Card>
    )
}