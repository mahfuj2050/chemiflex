import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const StatCard: React.FC<{ title: string; value: string | number; color: 'red'|'cyan'|'indigo'|'slate' }>=({ title, value, color }) => {
  const colors: Record<string, string> = {
    red: 'bg-red-500',
    cyan: 'bg-cyan-500',
    indigo: 'bg-indigo-500',
    slate: 'bg-slate-600',
  };
  return (
    <div className="rounded-md bg-white shadow border border-gray-200 overflow-hidden">
      <div className={`${colors[color]} px-4 py-3 text-white text-[12px] font-semibold uppercase tracking-wide`}>{title}</div>
      <div className="px-4 py-4 text-3xl font-bold text-gray-900">{value}</div>
    </div>
  );
};

const TableHeader: React.FC<{ title: string }>=({ title }) => (
  <div className="mb-3 flex items-center justify-between">
    <div className="text-[13px] font-semibold text-gray-700">{title}</div>
    <button className="rounded border border-gray-300 bg-white px-3 py-1 text-[12px] hover:bg-gray-50">Export</button>
  </div>
);

const AdminDashboard: React.FC = () => {
  const chartData = [
    { name: 'Jan', orders: 120 },
    { name: 'Feb', orders: 180 },
    { name: 'Mar', orders: 140 },
    { name: 'Apr', orders: 220 },
    { name: 'May', orders: 260 },
    { name: 'Jun', orders: 240 },
    { name: 'Jul', orders: 300 },
    { name: 'Aug', orders: 280 },
    { name: 'Sep', orders: 320 },
    { name: 'Oct', orders: 340 },
    { name: 'Nov', orders: 360 },
    { name: 'Dec', orders: 390 },
  ];
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-[22px] font-bold text-gray-900">Dashboard</h1>
        <p className="text-[13px] text-gray-600">Overview of your business at a glance.</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Revenue" value="$7,842,900" color="red" />
        <StatCard title="Orders" value="180,200" color="cyan" />
        <StatCard title="New Customers" value="38,900" color="indigo" />
        <StatCard title="Active Users" value="3,988" color="slate" />
      </div>

      {/* Middle section: chart + right panel */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="rounded-md border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2">
          <div className="mb-4 text-[13px] font-semibold text-gray-700">Orders</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
                <Tooltip cursor={{ stroke: '#94a3b8', strokeDasharray: '4 2' }} contentStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="orders" stroke="#06b6d4" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-md border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 text-[13px] font-semibold text-gray-700">Your daily feed</div>
          <ul className="space-y-3 text-[13px] text-gray-700">
            <li className="flex items-center justify-between"><span>New order #1024</span><span className="text-gray-400">2m</span></li>
            <li className="flex items-center justify-between"><span>User Alice signed up</span><span className="text-gray-400">14m</span></li>
            <li className="flex items-center justify-between"><span>Stock updated for SKU-001</span><span className="text-gray-400">1h</span></li>
            <li className="flex items-center justify-between"><span>Payment received</span><span className="text-gray-400">2h</span></li>
          </ul>
        </div>
      </div>

      {/* Table section */}
      <div className="rounded-md border border-gray-200 bg-white p-5 shadow-sm">
        <TableHeader title="Last Month Salary" />
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-[13px]">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-600">
                <th className="px-3 py-2 font-semibold">Name</th>
                <th className="px-3 py-2 font-semibold">Position</th>
                <th className="px-3 py-2 font-semibold">Office</th>
                <th className="px-3 py-2 font-semibold">Age</th>
                <th className="px-3 py-2 font-semibold">Start date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Array.from({ length: 10 }).map((_, i) => (
                <tr key={i} className="text-gray-700">
                  <td className="px-3 py-2">John Doe</td>
                  <td className="px-3 py-2">Sales Executive</td>
                  <td className="px-3 py-2">London</td>
                  <td className="px-3 py-2">{28 + i}</td>
                  <td className="px-3 py-2">2012/11/13</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-center justify-end gap-1">
          <button className="rounded border border-gray-300 bg-white px-3 py-1 text-[12px] hover:bg-gray-50">Prev</button>
          <button className="rounded border border-gray-300 bg-white px-3 py-1 text-[12px] hover:bg-gray-50">1</button>
          <button className="rounded border border-gray-300 bg-white px-3 py-1 text-[12px] hover:bg-gray-50">2</button>
          <button className="rounded border border-gray-300 bg-white px-3 py-1 text-[12px] hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
