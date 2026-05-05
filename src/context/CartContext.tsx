"use client";

import React, { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from "react";
import { Product, CartItem } from "@/types";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isHydrated: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product; quantity: number }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "HYDRATE"; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + action.quantity }
              : i
          ),
          isOpen: true,
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: action.quantity }],
        isOpen: true,
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.product.id !== action.productId),
      };
    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.product.id !== action.productId),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      };
    }
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "HYDRATE":
      return { ...state, items: action.items, isHydrated: true };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  subtotal: number;
  totalMrp: number;
  totalSavings: number;
  isFreeShipping: boolean;
  amountToFreeShipping: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
    isHydrated: false,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("9xpharma-cart");
      if (stored) {
        dispatch({ type: "HYDRATE", items: JSON.parse(stored) });
      } else {
        dispatch({ type: "HYDRATE", items: [] });
      }
    } catch {
      dispatch({ type: "HYDRATE", items: [] });
    }
  }, []);

  useEffect(() => {
    if (state.isHydrated) {
      localStorage.setItem("9xpharma-cart", JSON.stringify(state.items));
    }
  }, [state.items, state.isHydrated]);

  const totalItems = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items]
  );

  const subtotal = useMemo(
    () => state.items.reduce((sum, i) => sum + i.product.salePrice * i.quantity, 0),
    [state.items]
  );

  const totalMrp = useMemo(
    () => state.items.reduce((sum, i) => sum + i.product.mrp * i.quantity, 0),
    [state.items]
  );

  const totalSavings = useMemo(() => totalMrp - subtotal, [totalMrp, subtotal]);

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const addToCart = useCallback(
    (product: Product, quantity = 1) => dispatch({ type: "ADD_ITEM", product, quantity }),
    []
  );
  const removeFromCart = useCallback(
    (productId: string) => dispatch({ type: "REMOVE_ITEM", productId }),
    []
  );
  const updateQuantity = useCallback(
    (productId: string, quantity: number) => dispatch({ type: "UPDATE_QUANTITY", productId, quantity }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);
  const openCart = useCallback(() => dispatch({ type: "OPEN_CART" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE_CART" }), []);
  const toggleCart = useCallback(() => dispatch({ type: "TOGGLE_CART" }), []);

  const value = useMemo(
    () => ({
      items: state.items,
      isOpen: state.isOpen,
      totalItems,
      subtotal,
      totalMrp,
      totalSavings,
      isFreeShipping,
      amountToFreeShipping,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    }),
    [state.items, state.isOpen, totalItems, subtotal, totalMrp, totalSavings, isFreeShipping, amountToFreeShipping, addToCart, removeFromCart, updateQuantity, clearCart, openCart, closeCart, toggleCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
