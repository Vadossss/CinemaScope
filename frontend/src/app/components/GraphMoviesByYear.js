import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";


function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}



const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length > 0) {
        return (
            <div style={{
                backgroundColor: "#2a2a40",
                borderRadius: 10,
                padding: "10px 15px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                color: "#fff"
            }}>
                <p><strong className="text-orange-500">Год:</strong> {label}</p>
                <p><strong className="text-orange-500">Фильмов:</strong> {payload[0].value}</p>
            </div>
        );
    }
    return null;
};

function countMoviesByYear(userData) {
    console.log(userData)
    const allMovies = [
        ...userData.watched,
        ...userData.dropped,
        ...userData.planned,
        ...userData.watching,
    ];

    const yearCount = {};

    // Считаем фильмы по годам
    allMovies.forEach(movie => {
        const year = movie.year;
        if (year && year >= 1900 && year <= 2025) {
            yearCount[year] = (yearCount[year] || 0) + 1;
        }
    });

    // Заполняем недостающие года нулями
    const result = [];
    for (let y = 1900; y <= 2025; y++) {
        result.push({
            year: y,
            count: yearCount[y] || 0
        });
    }

    return result;
}

export default function MoviesByYearChart({ data }) {
    const graphData = countMoviesByYear(data);

    return (
        <ResponsiveContainer width={"100%"} height={400}>
            <BarChart
                data={graphData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                barCategoryGap="20%"
                style={{ backgroundColor: "#eeeeee", borderRadius: 12 }}
            >
                <CartesianGrid stroke="#868686" strokeDasharray="4 4" opacity={0.3} />
                <XAxis
                    dataKey="year"
                    tick={{ fill: "#000", fontSize: 10 }}
                    interval={Math.ceil((2025 - 1900) / 20)} // показываем только каждый N-й год
                />
                <YAxis
                    tick={{ fill: "#000", fontSize: 12 }}
                    allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                    dataKey="count"
                    fill="#ef781e"
                    radius={[6, 6, 0, 0]}
                    barSize={8}
                    cursor="pointer"
                />
            </BarChart>
        </ResponsiveContainer>
    );
}

