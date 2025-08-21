import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Boxes, Truck, Users, Tags } from 'lucide-react';

type IconType = React.ComponentType<{ className?: string }>;

const NavItem: React.FC<{ to: string; label: string; Icon: IconType }> = ({ to, label, Icon }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium transition-colors ${
        isActive
          ? 'bg-cyan-600/20 text-white ring-1 ring-inset ring-cyan-500'
          : 'text-gray-200 hover:bg-white/5 hover:text-white'
      }`
    }
  >
    <Icon className="h-4 w-4" />
    <span>{label}</span>
  </NavLink>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mt-6 mb-2 px-3 text-[11px] uppercase tracking-wider text-gray-400">
    {children}
  </div>
);

const Sidebar: React.FC = () => {
  return (
    <aside className="h-[calc(100vh-56px)] w-64 shrink-0 bg-gray-900 text-gray-200">
      <div className="h-full overflow-y-auto p-3">
        <div className="mb-3 px-3 text-lg font-semibold text-white">Admin Panel</div>
        <nav className="space-y-1">
          <SectionTitle>General</SectionTitle>
          <NavItem to="/admin" label="Dashboard" Icon={LayoutDashboard} />
          <SectionTitle>Management</SectionTitle>
          <NavItem to="/admin/products" label="Products" Icon={Package} />
          <NavItem to="/admin/categories" label="Categories" Icon={Tags} />
          <NavItem to="/admin/inventory" label="Inventory" Icon={Boxes} />
          <NavItem to="/admin/suppliers" label="Suppliers" Icon={Truck} />
          <NavItem to="/admin/customers" label="Customers" Icon={Users} />
          <NavItem to="/admin/sales" label="Sales" Icon={Boxes} />
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
