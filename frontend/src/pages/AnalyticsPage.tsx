import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Header, Footer } from "../shared";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { fetchAnalytics } from "../components/store/order/orderAsyncThunks";

const PIE_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const AnalyticsPage = () => {
  const dispatch = useAppDispatch();
  const { analytics, status } = useAppSelector(
    (state) => state.delivery.orders,
  );

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center bg-neutral-200 pt-20 text-neutral-700">
        <h2 className="text-2xl font-bold">Loading analytics...</h2>
      </div>
    );
  }

  const pieData =
    analytics?.ordersByStatus.map((item) => ({
      name: item.status,
      value: parseInt(item.count),
    })) || [];

  const barData =
    analytics?.popularProducts.map((item) => ({
      name: item.name,
      sales: parseInt(item.totalSold),
    })) || [];

  return (
    <div className="flex min-h-screen flex-col items-center bg-neutral-200 text-neutral-700">
      <Header />
      <main className="flex w-full flex-col items-center gap-10 px-6 py-14">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>

        <div className="flex w-full flex-wrap justify-center gap-10">
          <div className="flex h-96 w-[500px] flex-col items-center rounded-xl bg-white p-4 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Orders Distribution</h2>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percent = 0 }) =>
                      `${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="mt-20 text-gray-500">No orders yet</p>
            )}
          </div>

          <div className="flex h-96 w-[600px] flex-col items-center rounded-xl bg-white p-4 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">
              Top 5 Best Selling Products
            </h2>
            {barData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip cursor={{ fill: "transparent" }} />
                  <Bar
                    dataKey="sales"
                    name="Units Sold"
                    fill="#8884d8"
                    barSize={50}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="mt-20 text-gray-500">No sales data yet</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
