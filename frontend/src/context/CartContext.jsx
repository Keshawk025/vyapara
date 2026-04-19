import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client";
import { useAuth } from "./AuthContext";
import {
  addLocalCartItem,
  clearLocalCart,
  loadLocalCart,
  removeLocalCartItem,
  updateLocalCartItem,
} from "../utils/localCommerce";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);
  const [cartMode, setCartMode] = useState("local");
  const [loading, setLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  function useLocalCart() {
    const localCart = loadLocalCart();
    setCart(localCart);
    setCartMode("local");
    return localCart;
  }

  async function refreshCart() {
    if (!user) {
      useLocalCart();
      return;
    }

    setLoading(true);
    try {
      const response = await api.get("/cart/");
      setCart(response.data);
      setCartMode("remote");
    } catch {
      useLocalCart();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshCart();
  }, [user]);

  async function addToCart(productId, quantity = 1, productData = null) {
    const isRemoteEligible = user && Number.isInteger(Number(productId)) && !String(productId).startsWith("local-");

    if (isRemoteEligible && !productData?.forceLocal) {
      const response = await api.post("/cart/items/", { product_id: productId, quantity });
      setCart(response.data);
      setCartMode("remote");
      return response.data;
    }

    const nextCart = addLocalCartItem(
      productData ?? {
        id: productId,
        ...productData,
      },
      quantity,
    );
    setCart(nextCart);
    setCartMode("local");
    return nextCart;
  }

  async function updateQuantity(itemId, quantity) {
    if (cartMode === "remote" && Number.isInteger(Number(itemId))) {
      const response = await api.patch(`/cart/items/${itemId}/`, { quantity });
      setCart(response.data);
      return response.data;
    }

    const nextCart = updateLocalCartItem(itemId, quantity);
    setCart(nextCart);
    return nextCart;
  }

  async function removeItem(itemId) {
    if (cartMode === "remote" && Number.isInteger(Number(itemId))) {
      const response = await api.delete(`/cart/items/${itemId}/`);
      setCart(response.data);
      return response.data;
    }

    const nextCart = removeLocalCartItem(itemId);
    setCart(nextCart);
    return nextCart;
  }

  function resetLocalCart() {
    const emptyCart = clearLocalCart();
    setCart(emptyCart);
    setCartMode("local");
    return emptyCart;
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartMode,
        loading,
        isCartOpen,
        openCart,
        closeCart,
        refreshCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart: resetLocalCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
