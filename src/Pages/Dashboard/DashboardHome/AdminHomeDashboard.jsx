import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AdminHomeDashboard = () => {
    const axiosSecure = useAxiosSecure();

    const { data: delivery_status = [] } = useQuery({
        queryKey: ['delivery_status_stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels/delivery-status/stats');
            return res.data;
        },
    });

    // 👉 Convert API data → Recharts data
    const chartData = delivery_status.map(item => ({
        name: item._id,
        value: item.count,
    }));

    return (
        <div className="space-y-6 p-5">
            
            {/* Stats Section */}
            <div className="stats shadow">
                {delivery_status.map(stat => (
                    <div key={stat._id} className="stat">
                        <div className="stat-title">{stat._id}</div>
                        <div className="stat-value">{stat.count}</div>
                    </div>
                ))}
            </div>

            {/* Recharts Pie Chart */}
            <div className="w-full h-96 bg-base-100 shadow rounded-xl p-4">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            fill="#8884d8"
                            label
                        />
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminHomeDashboard;
