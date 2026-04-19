import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartDrawer() {
  const { cart, isCartOpen, closeCart, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed bottom-0 right-0 top-0 z-[101] flex w-full max-w-md flex-col border-l border-white/10 bg-slate-900/90 shadow-2xl backdrop-blur-2xl sm:w-[480px]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <h2 className="text-xl font-semibold text-white">Your Cart</h2>
              <button
                onClick={closeCart}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {!cart?.items?.length ? (
                <div className="flex h-full flex-col items-center justify-center text-slate-400">
                  <svg className="mb-4 h-12 w-12 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.06,
                      },
                    },
                  }}
                  className="flex flex-col gap-5"
                >
                  {cart.items.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={{
                        hidden: { opacity: 0, x: 18 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-4"
                    >
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-[16px] border border-white/10 bg-white/5">
                        {item.product.image_url ? (
                          <img src={item.product.image_url} alt={item.product.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full bg-white/10" />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col justify-between py-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-white line-clamp-1">{item.product.name}</h3>
                          <span className="font-medium text-white">${item.total_price}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-2 py-1">
                            <button
                              onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeItem(item.id)}
                              className="px-2 text-slate-400 hover:text-white"
                            >-</button>
                            <span className="text-sm text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 text-slate-400 hover:text-white"
                            >+</button>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="text-sm text-rose-400 hover:text-rose-300">Remove</button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {cart?.items?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="border-t border-white/10 bg-slate-950/50 p-6 backdrop-blur-md"
              >
                <div className="mb-4 flex justify-between text-lg font-semibold text-white">
                  <span>Total</span>
                  <span>${cart.total_price}</span>
                </div>
                <button onClick={handleCheckout} className="premium-button w-full">Proceed to Checkout</button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;
