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
        const score = payload[0].payload.averageScore;

        return (
            <div style={{
                backgroundColor: "#2a2a40",
                borderRadius: 10,
                padding: "10px 15px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                color: "#fff"
            }}>
                <p><strong className="text-orange-500">Средняя оценка:</strong> {score}</p>
            </div>
        );
    }

    return null;
};

// Функция интерполяции
function lerp(a, b, t) {
    return a + (b - a) * t;
}

function lerpColor(color1, color2, t) {
    return {
        r: Math.round(lerp(color1.r, color2.r, t)),
        g: Math.round(lerp(color1.g, color2.g, t)),
        b: Math.round(lerp(color1.b, color2.b, t)),
    };
}

function rgbToString({ r, g, b }) {
    return `rgb(${r},${g},${b})`;
}

function getComplexColorByScore(score) {
    const stops = [
        { score: 1, color: { r: 255, g: 0, b: 0 } },       // Красный
        { score: 4, color: { r: 255, g: 165, b: 0 } },     // Оранжевый
        { score: 7, color: { r: 255, g: 255, b: 0 } },     // Желтый
        { score: 10, color: { r: 0, g: 0, b: 255 } },      // Синий
    ];

    for (let i = 0; i < stops.length - 1; i++) {
        const start = stops[i];
        const end = stops[i + 1];

        if (score >= start.score && score <= end.score) {
            const t = (score - start.score) / (end.score - start.score);
            const color = lerpColor(start.color, end.color, t);
            return rgbToString(color);
        }
    }

    if (score < stops[0].score) return rgbToString(stops[0].color);
    if (score > stops[stops.length - 1].score) return rgbToString(stops[stops.length - 1].color);
}

export default function App({ data }) {
    const genreScoresMap = {};

    data.forEach((item) => {
        const score = item.scoreData.score;
        const genres = item.movie.genres.map(g => g.name);

        genres.forEach(genre => {
            if (!genreScoresMap[genre]) {
                genreScoresMap[genre] = [];
            }
            genreScoresMap[genre].push(score);
        });
    });

    const genreAverageScores = Object.entries(genreScoresMap).map(
        ([genre, scores]) => {
            const avg = scores.reduce((sum, s) => sum + s, 0) / scores.length;
            return {
                genre,
                averageScore: Number(avg.toFixed(2)),
                movieCount: scores.length,
                fill: getComplexColorByScore(avg),
            };
        }
    );

    const genreAverageScoresWithLabel = genreAverageScores.map(item => ({
        ...item,
        genreLabel: `${item.genre.charAt(0).toUpperCase() + item.genre.slice(1)} (${item.movieCount})`
    }));

    return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart
                data={genreAverageScoresWithLabel}
                layout="vertical"
                margin={{ top: 20, right: 15, left: -25, bottom: 20 }}
                style={{ backgroundColor: "#eeeeee", borderRadius: 12 }}
                barCategoryGap="20%"
            >
                <CartesianGrid stroke="#868686" strokeDasharray="4 4" opacity={0.3} />

                <XAxis
                    type="number"
                    domain={[0, 10]}
                    tick={{ fill: "#000000", fontSize: 12, fontWeight: 400 }}
                    axisLine={{ stroke: "#3d3d3d" }}
                    tickCount={6}
                    allowDecimals={false}
                />

                <YAxis
                    type="category"
                    dataKey="genreLabel"
                    tick={{ fill: "#000000", fontSize: 12, fontWeight: 400 }}
                    width={120}
                    axisLine={{ stroke: "rgba(0,0,0,0)" }}
                    tickLine={{ stroke: "rgba(61,61,61,0)" }}
                />

                <Tooltip content={<CustomTooltip />} />

                {/* Теперь используем предрассчитанный цвет из данных */}
                <Bar
                    dataKey="averageScore"
                    // fill={`linear-gradient(90deg, #157acb,#ec1e1e)`}
                    radius={[0, 6, 6, 0]}
                    barSize={25}
                    cursor="pointer"
                    fillOpacity={1}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}