import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';

export default function App({data})  {
    console.log(data)
    const getGenreStats = (collections) => {
        const allMovies = [
            ...collections.watched,
            ...collections.dropped,
            ...collections.planned,
            ...collections.watching,
        ];

        const genreCounts = {};

        allMovies.forEach(movie => {
            if (Array.isArray(movie.genres)) {
                movie.genres.forEach(genre => {
                    const genreName = genre.name;
                    genreCounts[genreName] = (genreCounts[genreName] || 0) + 1;
                });
            }
        });

        console.log(genreCounts);

        return Object.entries(genreCounts).map(([name, value]) => ({
            name,
            value,
        }));
    };

    const genreData = getGenreStats(data);


    const option = {
        title: {
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            textStyle: {
                color: '#fff'
            },
            bottom: 50
        },
        series: [
            {
                type: 'pie',
                radius: '85%',
                center: ['50%', '50%'],
                data: genreData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label: {
                    show: false,
                    position: 'center',
                    color: 'rgba(255, 255, 255, 1)'
                },
            }
        ]
    };

    return (
        <ReactECharts
            option={option}
            style={{ height: 400 }}
        />
    );
};
