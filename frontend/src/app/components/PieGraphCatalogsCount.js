import ReactECharts from 'echarts-for-react';

export default function App({data})  {
    const getCollectionCounts = (collections) => {
        return {
            watched: collections.watched.length,
            dropped: collections.dropped.length,
            planned: collections.planned.length,
            watching: collections.watching.length,
        }
    };

    const getTranslatedChartData = (counts) => {
        const translations = {
            watched: 'Просмотрено',
            dropped: 'Брошено',
            planned: 'Запланировано',
            watching: 'Смотрю',
        };

        return Object.entries(counts).map(([key, value]) => ({
            name: translations[key] || key,
            value,
        }));
    };

    const counts = getCollectionCounts(data);
    const collectionData = getTranslatedChartData(counts);


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
            bottom: 180
        },
        series: [
            {
                type: 'pie',
                radius: '85%',
                center: ['50%', '50%'],
                data: collectionData,
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
