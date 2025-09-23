import ContentCard from "../components/ContentCard";import { analyticsData } from "../data/mockData";
import { BarChart2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const DashboardTab = () => {
  return (
    <ContentCard title="Performance Analytics" icon={BarChart2}>
      <div style={{ width: '100%', height: 450 }}>
        <ResponsiveContainer>
          <LineChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
            <XAxis dataKey="month" stroke="#a0aec0" fontSize={12} />
            <YAxis stroke="#a0aec0" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a202c',
                border: '1px solid #4a5568',
                borderRadius: '0.75rem',
              }}
            />
            <Line
              type="monotone"
              dataKey="solved"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 5, fill: '#3b82f6' }}
              activeDot={{ r: 8, stroke: '#60a5fa', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ContentCard>
  );
};

export default DashboardTab;