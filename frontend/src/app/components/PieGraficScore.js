// import React from "react";
// import {
//     PieChart,
//     Pie,
//     Cell,
//     Tooltip,
//     ResponsiveContainer,
// } from "recharts";
//
// // Функция интерполяции между двумя цветами
// function interpolateColor(color1, color2, factor) {
//     const result = color1.slice();
//     for (let i = 0; i < 3; i++) {
//         result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
//     }
//     return result;
// }
//
// // Основные точки градиента: от красного до синего через промежуточные цвета
// const gradientStops = [
//     [255, 0, 0],    // 1 - красный
//     [255, 165, 0],  // 4 - оранжевый
//     [255, 255, 0],  // 6 - жёлтый
//     [0, 128, 0],    // 8 - зелёный
//     [0, 0, 255],    // 10 - синий
// ];
//
// const getSmoothColorByScore = (score) => {
//     const positions = [1, 4, 6, 8, 10];
//
//     for (let i = 0; i < positions.length - 1; i++) {
//         const left = positions[i];
//         const right = positions[i + 1];
//
//         if (score >= left && score <= right) {
//             const factor = (score - left) / (right - left);
//             const color = interpolateColor(gradientStops[i], gradientStops[i + 1], factor);
//             return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
//         }
//     }
//
//     // fallback (если вдруг вне диапазона)
//     return "rgb(255, 255, 255)";
// };
//
// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//                                    cx,
//                                    cy,
//                                    midAngle,
//                                    innerRadius,
//                                    outerRadius,
//                                    percent,
//                                }) => {
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);
//
//     return (
//         percent > 0.04 && (
//             <text
//                 x={x}
//                 y={y}
//                 fill="#fff"
//                 textAnchor="middle"
//                 dominantBaseline="central"
//                 fontSize={14}
//                 fontWeight={500}
//             >
//                 {`${(percent * 100).toFixed(0)}%`}
//             </text>
//         )
//     );
// };
//
// const getAggregatedScores = (ratings) => {
//     const counts = {};
//     ratings.forEach(({ scoreData }) => {
//         const score = scoreData.score;
//         counts[score] = (counts[score] || 0) + 1;
//     });
//
//     return Object.entries(counts)
//         .sort(([a], [b]) => b - a)
//         .map(([score, value]) => ({
//             name: `Оценка ${score}`,
//             value,
//             score: Number(score),
//         }));
// };
//
// export default function App({ data }) {
//     const ratings = getAggregatedScores(data);
//
//     return (
//         <div style={{ width: "100%", height: 400 }}>
//             <ResponsiveContainer>
//                 <PieChart>
//                     <Pie
//                         data={ratings}
//                         cx="50%"
//                         cy="50%"
//                         innerRadius={0}
//                         outerRadius={180}
//                         labelLine={false}
//                         label={renderCustomizedLabel}
//                         dataKey="value"
//                         stroke="#2a2a40"
//                         strokeWidth={2}
//                         isAnimationActive={true}
//                     >
//                         {ratings.map((entry, index) => (
//                             <Cell
//                                 key={`cell-${index}`}
//                                 fill={getSmoothColorByScore(entry.score)}
//                             />
//                         ))}
//                     </Pie>
//                     <Tooltip
//                         contentStyle={{
//                             backgroundColor: "#ffffff",
//                             borderRadius: 10,
//                             padding: "10px 15px",
//                             color: "#fff",
//                             border: "none",
//                         }}
//                         labelStyle={{ display: "none", color: "#ffffff" }}
//                         formatter={(value, name) => [`${value} голосов`, name]}
//                     />
//                 </PieChart>
//             </ResponsiveContainer>
//         </div>
//     );
// }


import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';

export default function App({data})  {

    const getAggregatedScores = (ratings) => {
        const counts = {};
        ratings.forEach(({ scoreData }) => {
            const score = scoreData.score;
            counts[score] = (counts[score] || 0) + 1;
        });

        return Object.entries(counts)
            .sort(([a], [b]) => b - a)
            .map(([score, value]) => ({
                name: `Оценка ${score}`,
                value,
                score: Number(score),
            }));
    };

    const ratings = getAggregatedScores(data);


    const option = {
        title : {
            x:'center'
        },
        labelLine: {
            show: false
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        label: {
            show: false,
            position: 'center',
            color: 'rgba(255, 255, 255, 0.3)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            x: 'center',
            // data: ['Оценка 10','Оценка 9','Оценка 8','Оценка 7','Оценка 6', 'Оценка 5', 'Оценка 4','Оценка 3','Оценка 2','Оценка 1',],
            textStyle: {
                color: 'rgb(255,255,255)',
                fontWeight: 'bold',
            }
        },
        series : [
            {
                type: 'pie',
                radius : '90%',
                center: ['50%', '50%'],
                data: ratings,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    return (
        <>
            <ReactECharts
                option={option}
                style={{ height: 400 }}
            />
        </>
    );
};
