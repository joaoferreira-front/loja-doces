import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { CartPage } from './pages/CartPage';
import { Contact } from './pages/Contact';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { WhatsAppButton } from './components/WhatsAppButton';

function App() {
  return (
    <Router>
      <ToastProvider>
        <CartProvider>
          <GlobalStyles />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/carrinho" element={<CartPage />} />
            <Route path="/contato" element={<Contact />} />
          </Routes>
          <WhatsAppButton />
        </CartProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
