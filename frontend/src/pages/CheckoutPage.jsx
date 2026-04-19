import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import api from "../api/client";
import { useCart } from "../context/CartContext";
import { createLocalOrderFromCart } from "../utils/localCommerce";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

function CheckoutForm() {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { cart, cartMode, refreshCart, clearCart } = useCart();
  const [shippingAddress, setShippingAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const cartEmpty = useMemo(() => !cart?.items?.length, [cart]);
  const usingLocalCheckout = cartMode === "local";

  async function handleSubmit(event) {
    event.preventDefault();
    if (cartEmpty) {
      return;
    }

    setSubmitting(true);
    setMessage("");
    try {
      if (usingLocalCheckout) {
        createLocalOrderFromCart({ cart, shippingAddress });
        clearCart();
        navigate("/orders");
        return;
      }

      if (!stripe || !elements) {
        setMessage("Stripe checkout is unavailable right now. Use the demo cart flow or configure Stripe keys.");
        return;
      }

      const orderResponse = await api.post("/orders/", { shipping_address: shippingAddress });
      const orderId = orderResponse.data.id;

      const paymentResponse = await api.post("/payments/create-intent/", { order_id: orderId });
      const { client_secret: clientSecret, payment_intent_id: paymentIntentId } = paymentResponse.data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(result.error.message || "Payment failed.");
        return;
      }

      await api.post("/payments/confirm/", { order_id: orderId, payment_intent_id: paymentIntentId });
      await refreshCart();
      navigate("/orders");
    } catch (error) {
      setMessage(error.response?.data?.detail || "Checkout failed.");
    } finally {
      setSubmitting(false);
    }
  }

  if (cartEmpty) {
    return (
      <div className="glass-panel rounded-[24px] px-5 py-6 text-sm text-slate-300">
        Your cart is empty. <Link to="/">Go back to products.</Link>
      </div>
    );
  }

  return (
    <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
      <motion.form
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel grid gap-6 rounded-[36px] p-6 shadow-soft sm:p-8"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="mb-3 text-xs uppercase tracking-[0.32em] text-cyan-200">Checkout</div>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Finish the purchase with a clean final pass.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
            Delivery details first, payment second, confirmation immediately after. The flow stays streamlined whether you are in live or demo commerce mode.
          </p>
        </div>

        <label>
          <span className="mb-2 block text-sm text-slate-300">Shipping Address</span>
          <textarea
            className="min-h-36 w-full rounded-[28px] border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none transition focus:border-cyan-300/40"
            value={shippingAddress}
            onChange={(event) => setShippingAddress(event.target.value)}
            rows="4"
            required
          />
        </label>

        {!usingLocalCheckout && (
          <label>
            <span className="mb-2 block text-sm text-slate-300">Card Details</span>
            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
              <CardElement />
            </div>
          </label>
        )}

        {usingLocalCheckout && (
          <div className="rounded-[24px] border border-cyan-300/20 bg-cyan-300/8 px-4 py-4 text-sm text-cyan-100">
            Demo checkout mode is active. Submitting this form will create a local order confirmation without requiring Stripe or backend order creation.
          </div>
        )}

        {!usingLocalCheckout && !stripe && (
          <div className="rounded-[24px] border border-amber-300/20 bg-amber-300/8 px-4 py-4 text-sm text-amber-100">
            Stripe is not configured in this environment yet. Add a publishable key to enable live payment confirmation.
          </div>
        )}

        <button className="premium-button w-full" disabled={submitting || (!usingLocalCheckout && !stripe)}>
          {submitting
            ? "Processing..."
            : usingLocalCheckout
              ? `Place Order $${cart.total_price}`
              : `Pay $${cart.total_price}`}
        </button>

        {message && <div className="glass-panel rounded-[20px] px-4 py-3 text-sm text-rose-300">{message}</div>}
      </motion.form>

      <motion.aside
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        className="glass-panel sticky top-28 h-fit rounded-[36px] p-6 shadow-soft"
      >
        <div className="mb-3 text-xs uppercase tracking-[0.28em] text-cyan-200">Order Snapshot</div>
        <h2 className="text-2xl font-semibold text-white">What ships now</h2>
        <div className="mt-6 space-y-4">
          {cart.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
              className="flex items-center gap-4 rounded-[24px] border border-white/8 bg-white/[0.03] p-3"
            >
              <div className="h-16 w-16 overflow-hidden rounded-[18px] bg-white/5">
                {item.product.image_url ? (
                  <img alt={item.product.name} className="h-full w-full object-cover" src={item.product.image_url} />
                ) : (
                  <div className="h-full w-full bg-white/5" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-white">{item.product.name}</div>
                <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Qty {item.quantity}</div>
              </div>
              <div className="text-sm font-medium text-white">${item.subtotal}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="mb-3 flex items-center justify-between text-sm text-slate-400">
            <span>Mode</span>
            <span className="capitalize text-white">{usingLocalCheckout ? "demo" : "live"}</span>
          </div>
          <div className="mb-6 flex items-end justify-between">
            <span className="text-sm text-slate-400">Total</span>
            <strong className="text-4xl font-semibold text-white">${cart.total_price}</strong>
          </div>
          <Link className="premium-button-secondary w-full" to="/cart">
            Back to Cart
          </Link>
        </div>
      </motion.aside>
    </section>
  );
}

function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default CheckoutPage;
