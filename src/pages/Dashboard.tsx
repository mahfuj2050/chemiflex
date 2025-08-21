import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const Card: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className="text-sm font-semibold text-gray-600">{title}</div>
    <div className="mt-2 text-2xl font-bold text-gray-900">{children}</div>
  </div>
);

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  return (
    <section className="py-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Welcome {user?.fullName ?? 'User'}!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card title="Products">0</Card>
          <Card title="Stock on Hand">0</Card>
          <Card title="Suppliers">0</Card>
          <Card title="Customers">0</Card>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
