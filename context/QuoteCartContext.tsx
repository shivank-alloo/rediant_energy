"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Product } from "@/lib/products";

interface QuoteItem {
  product: Product;
  qty: number;
}

interface QuoteCartContextType {
  items: QuoteItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  totalCount: number;
  isInCart: (productId: string) => boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const QuoteCartContext = createContext<QuoteCartContextType | null>(null);

export function QuoteCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev;
      return [...prev, { product, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQty = useCallback((productId: string, qty: number) => {
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, qty } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalCount = items.length;

  const isInCart = useCallback(
    (productId: string) => items.some((i) => i.product.id === productId),
    [items]
  );

  return (
    <QuoteCartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearCart, totalCount, isInCart, isOpen, setIsOpen }}
    >
      {children}
    </QuoteCartContext.Provider>
  );
}

export function useQuoteCart() {
  const ctx = useContext(QuoteCartContext);
  if (!ctx) throw new Error("useQuoteCart must be used within QuoteCartProvider");
  return ctx;
}
