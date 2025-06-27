import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import './Chart.css';

// Mock Data
const orderData = [
  { date: "Jan 2025", orders: 120, revenue: 2400 },
  { date: "Feb 2025", orders: 150, revenue: 3000 },
  { date: "Mar 2025", orders: 180, revenue: 3600 },
  { date: "Apr 2025", orders: 200, revenue: 4000 },
  { date: "May 2025", orders: 170, revenue: 3400 },
  { date: "Jun 2025", orders: 190, revenue: 3800 },
];

const topFood = [
  { name: "Pizza", orders: 250 },
  { name: "Burger", orders: 180 },
  { name: "Pasta", orders: 120 },
  { name: "Sushi", orders: 90 },
  { name: "Salad", orders: 60 },
];

const userStats = [
  { type: "Admin", count: 10 },
  { type: "Customer", count: 150 },
  { type: "Guest", count: 40 },
];

// Colors for PieChart
const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1"];

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg border border-gray-700">
        <p className="font-bold">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-8 bg-red-100 text-red-700 rounded-lg">
          <h2 className="text-2xl font-bold">Something went wrong!</h2>
          <p>{this.state.error?.message || "Unknown error occurred"}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const ChartPage = () => {
  const [theme, setTheme] = useState("light"); // Theme toggle state

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ErrorBoundary>
      <div
        className={`min-h-screen p-6 ${
          theme === "light" ? "bg-gray-100" : "bg-gray-900"
        } transition-colors duration-300`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2
            className={`text-3xl font-bold ${
              theme === "light" ? "text-gray-800" : "text-white"
            }`}
          >
            📊 Analytics Dashboard
          </h2>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>

        {/* Grid Layout for Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Orders & Revenue Chart */}
          <div
            className={`p-6 rounded-lg shadow-lg ${
              theme === "light" ? "bg-white" : "bg-gray-800"
            } transition-all duration-300`}
          >
            <h3
              className={`text-xl font-semibold mb-4 ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}
            >
              Orders & Revenue
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={orderData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === "light" ? "#e5e7eb" : "#4b5563"} />
                <XAxis
                  dataKey="date"
                  stroke={theme === "light" ? "#374151" : "#d1d5db"}
                  tick={{ fill: theme === "light" ? "#374151" : "#d1d5db" }}
                />
                <YAxis stroke={theme === "light" ? "#374151" : "#d1d5db"} tick={{ fill: theme === "light" ? "#374151" : "#d1d5db" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                  isAnimationActive={true}
                  animationDuration={1000}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                  isAnimationActive={true}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Ordered Foods Chart */}
          <div
            className={`p-6 rounded-lg shadow-lg ${
              theme === "light" ? "bg-white" : "bg-gray-800"
            } transition-all duration-300`}
          >
            <h3
              className={`text-xl font-semibold mb-4 ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}
            >
              Top Ordered Foods
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topFood} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === "light" ? "#e5e7eb" : "#4b5563"} />
                <XAxis
                  dataKey="name"
                  stroke={theme === "light" ? "#374151" : "#d1d5db"}
                  tick={{ fill: theme === "light" ? "#374151" : "#d1d5db" }}
                />
                <YAxis stroke={theme === "light" ? "#374151" : "#d1d5db"} tick={{ fill: theme === "light" ? "#374151" : "#d1d5db" }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="orders"
                  fill="#ffc658"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={true}
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* User Types Chart */}
          <div
            className={`p-6 rounded-lg shadow-lg md:col-span-2 ${
              theme === "light" ? "bg-white" : "bg-gray-800"
            } transition-all duration-300`}
          >
            <h3
              className={`text-xl font-semibold mb-4 ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}
            >
              User Types
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userStats}
                  dataKey="count"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={{ stroke: theme === "light" ? "#374151" : "#d1d5db" }}
                  isAnimationActive={true}
                  animationDuration={1000}
                >
                  {userStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ChartPage;