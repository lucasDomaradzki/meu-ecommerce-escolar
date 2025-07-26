import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/home/HomePage';
import ProductsPage from './pages/products/ProductsPage';
import ProductDetailPage from './pages/products/ProductDetailPage';
import CartPage from './pages/cart/CartPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import AboutPage from './pages/about/AboutPage';
import ContactPage from './pages/contact/ContactPage';
import PrivacyPolicyPage from './pages/legal/PrivacyPolicyPage';
import TermsOfUsePage from './pages/legal/TermsOfUsePage';
import ProfilePage from './pages/user/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import GlobalStyles from './styles/GlobalStyles';
import SchoolGradeSelectionPage from './pages/SchoolGradeSelectionPage';
import OrderHistoryPage from './pages/user/OrderHistoryPage';
import OrderDetailPage from './pages/user/OrderDetailPage';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminSuppliersPage from './pages/admin/AdminSuppliersPage';
import AdminShippingCompaniesPage from './pages/admin/AdminShippingCompaniesPage';
import AdminSchoolsPage from './pages/admin/AdminSchoolsPage';
import AdminContactsPage from './pages/admin/AdminContactsPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminInventoryPage from './pages/admin/AdminInventoryPage';
import AdminOrdersPage from './components/admin/AdminOrdersPage';

function App() {
  return (
    <Router>
      <CartProvider>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path="/" element={<SchoolGradeSelectionPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/pacotes" element={<ProductsPage />} />
          <Route path="/pacotes/:id" element={<ProductDetailPage />} />
          <Route path="/carrinho" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/politica-privacidade" element={<PrivacyPolicyPage />} />
          <Route path="/termos-de-uso" element={<TermsOfUsePage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/meus-pedidos" element={<OrderHistoryPage />} />
          <Route path="/meus-pedidos/:id" element={<OrderDetailPage />} />

          {/* Novas Rotas para o Painel Administrativo */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="distribuidores" element={<AdminSuppliersPage />} />
            <Route path="empresas-entrega" element={<AdminShippingCompaniesPage />} />
            <Route path="escolas" element={<AdminSchoolsPage />} />
            <Route path="contatos" element={<AdminContactsPage />} />
            <Route path="produtos" element={<AdminProductsPage />} />
            <Route path="inventario" element={<AdminInventoryPage />} />
            <Route path="pedidos" element={<AdminOrdersPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;
