import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ProductCard({ product, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setTilt({ rotateX, rotateY });
  }

  function handleMouseLeave() {
    setTilt({ rotateX: 0, rotateY: 0 });
    setHovered(false);
  }

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: hovered ? "transform 0.08s linear" : "transform 0.7s cubic-bezier(0.33,1,0.68,1), box-shadow 0.5s ease",
        transformStyle: "preserve-3d",
        willChange: "transform",
        scrollSnapAlign: "start",
        flexShrink: 0,
        /* Only the card border glows — no full surface fill */
        boxShadow: hovered
          ? "0 0 0 1.5px rgba(168, 85, 247, 0.6), 0 0 18px 2px rgba(168, 85, 247, 0.25), 0 16px 40px -8px rgba(0,0,0,0.5)"
          : "0 2px 20px rgba(0,0,0,0.3)",
      }}
      className="group glass-panel relative min-w-[270px] overflow-hidden rounded-[28px] p-4 cursor-pointer"
    >
      <div
        style={{ transform: "translateZ(18px)", transformStyle: "preserve-3d" }}
        className="relative h-64 overflow-hidden rounded-[22px]"
      >
        <img
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          loading="lazy"
          src={product.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="absolute bottom-4 left-4 right-4"
          style={{ transform: "translateZ(8px)" }}
        >
          <Link className="premium-button w-full text-sm" to={`/products/${product.id}`}>
            View Product
          </Link>
        </motion.div>
      </div>

      <div
        style={{ transform: "translateZ(12px)" }}
        className="space-y-3 px-1 pb-1 pt-5"
      >
        <div className="text-xs uppercase tracking-[0.28em] text-slate-500">{product.category}</div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium text-white">{product.title}</h3>
            <p className="mt-1 text-sm text-slate-400">{product.subtitle}</p>
          </div>
          <div className="text-base font-semibold text-white">{product.price}</div>
        </div>
      </div>
    </motion.article>
  );
}

export default ProductCard;
