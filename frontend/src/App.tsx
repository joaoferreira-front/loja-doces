```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import { Header } from './components/Header';
import { CartProvider } from './context/CartContext';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Contact } from './pages/Contact';
import { CartPage } from './pages/CartPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/carrinho" element={<CartPage />} />
        </Routes>
        
        <a href="https://wa.me/5511951737912" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
        </a>
      </Router>
    </CartProvider>
  );
}

export default App;
```
