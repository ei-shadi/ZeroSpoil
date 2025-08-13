import { useState, useEffect } from "react";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const FoodWasteInsights = () => {
  const data = [
    { name: "Saved from Spoiling", value: 45 },
    { name: "Donated", value: 25 },
    { name: "Consumed Fresh", value: 15 },
    { name: "Expired", value: 15 }
  ];

  const COLORS = ["#00f254", "#2d8bff", "#facc15","#ff0202" ];

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640); 
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="px-4 mx-auto sm:max-w-xl md:max-w-7xl lg:max-w-screen-xl md:px-10 lg:px-8">
      {/* Header */}
      <header className="text-center mb-10 md:mb-12">
        <h1 className="text-4xl md:text-6xl leading-tight px-4 md:px-5 mx-auto font-bold max-w-4xl">
          Food
          <span className="text-[#a05cff] italic px-1">Waste</span> Insights
          <HiOutlineClipboardDocumentList className="inline ml-2 text-[#8338EC]" />
        </h1>
        <p className="text-lg md:text-xl text-center des-color mx-auto mt-3 md:mt-5 max-w-2xl px-6 sm:px-8 font-semibold opacity-70">
          See how you’re making a difference in reducing food waste. Track your saved items, donations, and more.
        </p>
      </header>

      {/* Chart Container */}
      <div className="bg-black backdrop-blur-lg shadow-xl rounded-2xl p-2 border border-gray-200 text-xs md:text-lg ">
        <ResponsiveContainer width="100%" height={isSmallScreen ? 250 : 320}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={isSmallScreen ? "65%" : "75%"}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                  className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "1.1rem", marginTop: "1rem" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default FoodWasteInsights;
