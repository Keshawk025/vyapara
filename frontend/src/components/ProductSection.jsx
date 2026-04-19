import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";

function ProductSection({ id, eyebrow, title, products, loading = false }) {
  const items = loading ? Array.from({ length: 4 }, (_, index) => ({ id: `s-${index}` })) : products;

  return (
    <motion.section
      id={id}
      className="section-shell py-8 sm:py-10"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-6 flex items-end justify-between gap-6">
        <div>
          <div className="text-xs uppercase tracking-[0.28em] text-cyan-100/70">{eyebrow}</div>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
        </div>
        <a className="hidden text-sm text-slate-400 transition-colors hover:text-white sm:block" href={`#${id}`}>
          View all
        </a>
      </div>

      {/* scroll-snap: mandatory snap on mobile, free scroll on desktop */}
      <div
        className="flex gap-5 overflow-x-auto pb-4 pt-4 -mb-4 -mt-4 px-1"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",       /* Firefox */
          msOverflowStyle: "none",      /* IE/Edge */
        }}
      >
        {items.map((product, index) =>
          loading ? <SkeletonCard key={product.id} /> : <ProductCard key={product.id} index={index} product={product} />,
        )}
      </div>
    </motion.section>
  );
}

export default ProductSection;
