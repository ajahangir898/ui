
import React, { useState, useEffect, Suspense, lazy } from 'react';
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
import { fetchSiteConfig, fetchProducts } from './api';
import { Product, SiteConfig } from './types';

const ProductView = lazy(() => import('./components/ProductView'));
const Checkout = lazy(() => import('./components/Checkout'));
const OrderConfirmed = lazy(() => import('./components/OrderConfirmed'));

function App() {
  const [view, setView] = useState<'home' | 'product' | 'checkout' | 'success'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [configData, productData] = await Promise.all([
          fetchSiteConfig(),
          fetchProducts()
        ]);
        setConfig(configData);
        setProducts(productData);
        setSelectedProduct(productData[4]); // Default for demo
      } catch (error) {
        console.error("Failed to fetch dashboard config", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setView('product');
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setView('home');
    window.scrollTo(0, 0);
  };

  if (loading) return <LoadingFallback />;

  return (
    <div className="min-h-screen flex flex-col selection:bg-pink-100 selection:text-pink-600 pb-12 md:pb-0 font-['Inter'] antialiased">
      <Header onLogoClick={navigateToHome} />
      
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
                />
              </div>
              <SpecialOffer config={config.specialOffer} />
              <DealOfTheDay products={products} onProductClick={navigateToProduct} />
              <TrustSection items={config.trustItems} />
            </div>
          )}

          {view === 'product' && selectedProduct && (
            <ProductView product={selectedProduct} onBuyNow={() => setView('checkout')} />
          )}

          {view === 'checkout' && (
            <Checkout onConfirm={() => setView('success')} onBack={navigateToHome} />
          )}

          {view === 'success' && (
            <OrderConfirmed onContinue={navigateToHome} />
          )}
        </Suspense>
      </main>

      <Footer />
      <MobileBottomNav currentView={view} onNavigate={setView} />
    </div>
  );
}

export default App;
