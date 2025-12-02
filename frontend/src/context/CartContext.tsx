import { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import type { Produto, ItemCarrinho } from '../types';

interface CartContextData {
    cart: ItemCarrinho[];
    addToCart: (produto: Produto) => void;
    removeFromCart: (produtoId: number) => void;
    clearCart: () => void;
    total: number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<ItemCarrinho[]>(() => {
        try {
            const storedCart = localStorage.getItem('@DocesGJ:cart');
            if (storedCart) {
                const parsed = JSON.parse(storedCart);
                if (Array.isArray(parsed)) {
                    // Validate each item to ensure it has necessary properties
                    return parsed.filter(item =>
                        item &&
                        typeof item.id === 'number' &&
                        typeof item.nome === 'string' &&
                        typeof item.preco === 'number' &&
                        typeof item.quantidadeCarrinho === 'number'
                    );
                }
                return [];
            }
        } catch (error) {
            console.error("Erro ao carregar carrinho:", error);
            localStorage.removeItem('@DocesGJ:cart');
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('@DocesGJ:cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (produto: Produto) => {
        setCart(currentCart => {
            const itemExists = currentCart.find(item => item.id === produto.id);
            if (itemExists) {
                return currentCart.map(item =>
                    item.id === produto.id
                        ? { ...item, quantidadeCarrinho: item.quantidadeCarrinho + 1 }
                        : item
                );
            }
            return [...currentCart, { ...produto, quantidadeCarrinho: 1 }];
        });
    };

    const removeFromCart = (produtoId: number) => {
        setCart(currentCart => currentCart.filter(item => item.id !== produtoId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const total = cart.reduce((sum, item) => sum + (item.preco * item.quantidadeCarrinho), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
