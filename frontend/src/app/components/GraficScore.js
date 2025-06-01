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
        // console.log(payload)
        // console.log(active)
        const movieTitle = payload[0].payload.movie.name !== null ? payload[0].payload.movie.name : payload[0].payload.movie.enName;
        const score = payload[0].value;
        const date = formatDate(label);

        return (
            <div style={{
                backgroundColor: "#2a2a40",
                borderRadius: 10,
                padding: "10px 15px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                color: "#fff"
            }}>
                <p className="text-white"><strong className="text-orange-500">Дата:</strong> {date}</p>
                <p className="text-white"><strong className="text-orange-500">Фильм:</strong> {movieTitle}</p>
                <p className="text-white"><strong className="text-orange-500">Оценка:</strong> {score}</p>
            </div>
        );
    }

    return null;
};

export default function App({ data }) {
    return (
        <ResponsiveContainer width={"100%"} height={400}>
            <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: -10, bottom: -40 }}
                barCategoryGap="20%"
                style={{ backgroundColor: "#eeeeee", borderRadius: 12 }}
            >
                {/* Светлая сетка с пунктиром */}
                <CartesianGrid stroke={`#868686`} strokeDasharray="4 4" opacity={0.3} />

                {/* Ось X с аккуратным шрифтом и отступами */}
                <XAxis
                    dataKey="scoreData.createdAt"
                    tickFormatter={formatDate}
                    tick={{ fill: "#000000", fontSize: 12, fontWeight: 400 }}
                    // tickSize={3}
                    // tickMargin={10}
                    axisLine={{ stroke: "#3d3d3d" }}
                    // angle={-45}
                    // textAnchor="end"
                    height={70}
                />

                {/* Ось Y с градацией от 0 до 10 */}
                <YAxis
                    dataKey="scoreData.score"
                    domain={[0, 10]}
                    tick={{ fill: "#000000", fontSize: 12, fontWeight: 400 }}
                    axisLine={{ stroke: "#3d3d3d" }}
                    tickCount={6}
                    allowDecimals={false}
                />

                {/* Кастомный тултип */}
                {/*<Tooltip*/}
                {/*    contentStyle={{*/}
                {/*        backgroundColor: "#2a2a40",*/}
                {/*        border: "none",*/}
                {/*        borderRadius: 10,*/}
                {/*        padding: "10px 15px",*/}
                {/*        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",*/}
                {/*        fontSize: 14,*/}
                {/*        color: "#fff",*/}
                {/*    }}*/}
                {/*    labelStyle={{ color: "#00ff95", fontWeight: "bold", marginBottom: 5 }}*/}
                {/*    formatter={(value) => [`${value}%`, "Доля побед"]}*/}
                {/*/>*/}

                <Tooltip content={<CustomTooltip />} />

                {/* Столбцы с основным цветом и скруглением */}
                <Bar
                    dataKey="scoreData.score"
                    fill="#ef781e"
                    radius={[6, 6, 0, 0]}
                    barSize={35}
                    cursor="pointer"
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
