
import React, { useState, useEffect, Suspense, lazy, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FlashSale from './components/FlashSale';
import DealOfTheDay from './components/DealOfTheDay';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import TrustSection from './components/TrustSection';
import SpecialOffer from './components/SpecialOffer';
import LoadingFallback from './components/LoadingFallback';
import FloatingCart from './components/FloatingCart';
import { fetchSiteConfig, fetchProducts } from './api';
import { Product, SiteConfig } from './types';

const ProductView = lazy(() => import('./components/ProductView'));
const Checkout = lazy(() => import('./components/Checkout'));
const OrderConfirmed = lazy(() => import('./components/OrderConfirmed'));
const SearchView = lazy(() => import('./components/SearchView'));

interface CartItem {
  id: string;
  price: number;
  quantity: number;
}

function App() {
  const [view, setView] = useState<'home' | 'product' | 'checkout' | 'success' | 'search'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);

  useEffect(() => {
    async function loadData() {
      try {
        const [configData, productData] = await Promise.all([
          fetchSiteConfig(),
          fetchProducts()
        ]);
        setConfig(configData);
        setProducts(productData);
      } catch (error) {
        console.error("Failed to fetch dashboard config", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: product.id, price: product.price, quantity: 1 }];
    });
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    setSearchQuery(query);
    setView('search');
    window.scrollTo(0, 0);
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setView('product');
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setView('home');
    setSearchQuery('');
    window.scrollTo(0, 0);
  };

  if (loading) return <LoadingFallback />;

  return (
    <div className="min-h-screen flex flex-col selection:bg-pink-100 selection:text-pink-600 pb-12 md:pb-0 font-['Inter'] antialiased">
      <Header 
        onLogoClick={navigateToHome} 
        onSearch={handleSearch} 
        products={products}
        onSuggestionClick={navigateToProduct}
        cartCount={totalItems}
      />
      
      <main className="flex-grow">
        <Suspense fallback={<LoadingFallback />}>
          {view === 'home' && config && (
            <div className="animate-in fade-in duration-500 space-y-8 md:space-y-12">
              <Hero slides={config.heroSlides} />
              <div className="space-y-6 md:space-y-10">
                <Categories categories={config.categories} />
                <FlashSale 
                  products={products} 
                  initialTime={config.flashSaleTime} 
                  onProductClick={navigateToProduct}
                  onAddToCart={handleAddToCart}
                />
              </div>
              <SpecialOffer config={config.specialOffer} />
              <DealOfTheDay products={products} onProductClick={navigateToProduct} onAddToCart={handleAddToCart} />
              <TrustSection items={config.trustItems} />
            </div>
          )}

          {view === 'search' && (
            <SearchView 
              query={searchQuery} 
              allProducts={products} 
              onProductClick={navigateToProduct} 
              onBack={navigateToHome}
              onAddToCart={handleAddToCart}
            />
          )}

          {view === 'product' && selectedProduct && (
            <ProductView 
              product={selectedProduct} 
              onBuyNow={() => setView('checkout')} 
              onAddToCart={() => handleAddToCart(selectedProduct)}
            />
          )}

          {view === 'checkout' && (
            <Checkout 
              onConfirm={() => {
                setCart([]);
                setView('success');
              }} 
              onBack={navigateToHome} 
              cartItems={cart}
              totalPrice={totalPrice}
            />
          )}

          {view === 'success' && (
            <OrderConfirmed onContinue={navigateToHome} />
          )}
        </Suspense>
      </main>

      <FloatingCart itemCount={totalItems} totalPrice={totalPrice} onClick={() => setView('checkout')} />
      <Footer />
      <MobileBottomNav currentView={view} onNavigate={setView} cartCount={totalItems} />
    </div>
  );
}

export default App;
