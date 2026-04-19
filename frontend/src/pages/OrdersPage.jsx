import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/client";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import { loadLocalOrders } from "../utils/localCommerce";

function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      const localOrders = loadLocalOrders();

      if (!user) {
        setOrders(localOrders);
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/orders/");
        const remoteOrders = response.data.results || response.data;
        setOrders([...localOrders, ...remoteOrders]);
      } catch {
        setOrders(localOrders);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [user]);

  if (loading) {
    return <Loader label="Loading orders..." />;
  }

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        <div className="mb-3 text-xs uppercase tracking-[0.32em] text-cyan-200">Orders</div>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Every completed purchase, live or demo, in one sequence.
        </h1>
      </motion.div>

      {!orders.length && (
        <div className="glass-panel rounded-[28px] px-6 py-8 text-sm text-slate-300">
          No orders yet. Complete a cart checkout to see the confirmation flow here.
        </div>
      )}

      <div className="grid gap-5">
        {orders.map((order, index) => (
          <motion.article
            key={order.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="glass-panel grid gap-6 rounded-[32px] p-6 shadow-soft lg:grid-cols-[0.75fr_1.25fr]"
          >
            <div>
              <div className="mb-2 text-[11px] uppercase tracking-[0.28em] text-cyan-200">
                {order.isLocal ? "Demo Order" : "Live Order"}
              </div>
              <h3 className="text-2xl font-medium text-white">Order #{order.id}</h3>
              <p className="mt-3 text-sm text-slate-400">Status: {order.status}</p>
              <p className="mt-1 text-sm text-slate-300">Total: ${order.total_price}</p>
            </div>

            <div className="grid gap-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-[20px] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                  <span>{item.product_name}</span>
                  <span className="text-white">x {item.quantity}</span>
                </div>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default OrdersPage;
