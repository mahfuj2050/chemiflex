import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const Topbar: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between bg-cyan-700 px-4 shadow">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded bg-cyan-600 text-white">≡</div>
        <div className="text-[14px] font-semibold tracking-wide text-white">Admin Panel</div>
      </div>
      <div className="flex items-center gap-3 text-white">
        <div className="text-[13px] opacity-90">{user?.fullName}</div>
        <button
          onClick={logout}
          className="rounded-md bg-cyan-600 px-3 py-1.5 text-[12px] font-semibold hover:bg-cyan-500"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
