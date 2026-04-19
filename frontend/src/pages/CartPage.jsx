import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useCart } from "../context/CartContext";

function CartPage() {
  const { cart, loading, updateQuantity, removeItem, cartMode } = useCart();

  if (loading) {
    return <Loader label="Loading cart..." />;
  }

  return (
    <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div className="mb-3 text-xs uppercase tracking-[0.32em] text-cyan-200">
            Cart Review
          </div>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Review the edit before you lock the order.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
            Refine quantities, remove anything that slows the look down, and move straight into checkout when the mix feels right.
          </p>
        </motion.div>

        {!cart?.items?.length && (
          <div className="glass-panel rounded-[32px] px-6 py-8 text-sm text-slate-300">
            Your cart is empty. <Link className="text-cyan-200" to="/">Go back to the collection.</Link>
          </div>
        )}

        <div className="grid gap-5">
          {cart?.items?.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="glass-panel grid gap-5 rounded-[30px] p-5 shadow-soft sm:grid-cols-[140px_1fr_auto]"
            >
              <div className="overflow-hidden rounded-[24px] bg-white/5">
                {item.product.image_url ? (
                  <img alt={item.product.name} className="h-36 w-full object-cover" src={item.product.image_url} />
                ) : (
                  <div className="flex h-36 items-center justify-center bg-white/5 text-slate-500">No image</div>
                )}
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <div className="mb-2 text-[11px] uppercase tracking-[0.28em] text-slate-500">
                    {item.product.category ?? "Collection"}
                  </div>
                  <h3 className="text-2xl font-medium text-white">{item.product.name}</h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                    Premium selection prepared for a clean checkout flow.
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <input
                    className="h-11 w-24 rounded-full border border-white/10 bg-white/[0.04] px-4 text-white outline-none focus:border-cyan-300/40"
                    type="number"
                    min="1"
                    max={item.product.stock}
                    value={item.quantity}
                    onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
                  />
                  <button className="premium-button-secondary" onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-start justify-between gap-4 sm:items-end">
                <div className="text-sm text-slate-400">${item.product.price} each</div>
                <div className="text-2xl font-semibold text-white">${item.subtotal}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <motion.aside
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        className="glass-panel sticky top-28 h-fit rounded-[34px] p-6 shadow-soft"
      >
        <div className="mb-3 text-xs uppercase tracking-[0.28em] text-cyan-200">
          Order Summary
        </div>
        <h2 className="text-2xl font-semibold text-white">Ready to move?</h2>
        <div className="mt-8 space-y-4 text-sm text-slate-300">
          <div className="flex items-center justify-between">
            <span>Cart mode</span>
            <span className="capitalize text-white">{cartMode}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Items</span>
            <span className="text-white">
              {cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Delivery</span>
            <span className="text-white">Calculated at checkout</span>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="mb-6 flex items-end justify-between">
            <span className="text-sm text-slate-400">Total</span>
            <strong className="text-4xl font-semibold text-white">${cart?.total_price || "0.00"}</strong>
          </div>
          <Link className="premium-button w-full" to="/checkout">
            Proceed to Checkout
          </Link>
          <Link className="premium-button-secondary mt-3 w-full" to="/">
            Continue Shopping
          </Link>
        </div>
      </motion.aside>
    </section>
  );
}

export default CartPage;
