import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Partners from '@/pages/Partners';
import Products from '@/pages/Products';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminProducts from '@/pages/admin/Products';
import AdminInventory from '@/pages/admin/Inventory';
import AdminSuppliers from '@/pages/admin/Suppliers';
import AdminSupplierNew from '@/pages/admin/SupplierNew';
import AdminCustomers from '@/pages/admin/Customers';
import AdminProductNew from '@/pages/admin/ProductNew';
import AdminCategories from '@/pages/admin/Categories';
import AdminCategoryNew from '@/pages/admin/CategoryNew';
import AdminCustomerNew from '@/pages/admin/CustomerNew';
import AdminSales from '@/pages/admin/Sales';
import AdminSaleNew from '@/pages/admin/SaleNew';
import AdminSaleEdit from '@/pages/admin/SaleEdit';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    // Admin area: render dedicated admin layout and routes (no public Navigation/Footer)
    return (
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<AdminProductNew />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="categories/new" element={<AdminCategoryNew />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="suppliers" element={<AdminSuppliers />} />
          <Route path="suppliers/new" element={<AdminSupplierNew />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="customers/new" element={<AdminCustomerNew />} />
          <Route path="sales" element={<AdminSales />} />
          <Route path="sales/new" element={<AdminSaleNew />} />
          <Route path="sales/:id/edit" element={<AdminSaleEdit />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  // Public site
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;