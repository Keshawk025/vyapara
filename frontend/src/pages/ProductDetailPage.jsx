import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/client";
import Loader from "../components/Loader";
import { useCart } from "../context/CartContext";
import { findFeaturedProductById } from "../data/featuredProducts";

const STORY_SLIDES = [
  {
    label: "Design",
    emoji: "◻",
    description: "Every stitch, seam, and silhouette crafted with obsessive precision.",
  },
  {
    label: "Material",
    emoji: "✦",
    description: "Sourced from sustainable ateliers. Feels as extraordinary as it looks.",
  },
  {
    label: "Fit",
    emoji: "⬡",
    description: "Engineered to move with you across every moment of the day.",
  },
  {
    label: "Craft",
    emoji: "⬟",
    description: "Finished by hand. Each piece is a unique expression of the art of dressing.",
  },
];

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();
  const [product, setProduct] = useState(null);
  const [isDemoProduct, setIsDemoProduct] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [wishlistActive, setWishlistActive] = useState(false);

  const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

  // Scroll-driven storytelling
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.08, 1.14]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const storyProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, STORY_SLIDES.length - 1]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    storyProgress.on("change", (v) => {
      setActiveSlide(Math.round(Math.min(v, STORY_SLIDES.length - 1)));
    });
  }, [storyProgress]);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const response = await api.get(`/products/${id}/`);
        setProduct(response.data);
        setIsDemoProduct(false);
      } catch {
        const featuredProduct = findFeaturedProductById(id);
        if (featuredProduct) {
          setProduct({
            id: featuredProduct.id,
            name: featuredProduct.title,
            description: featuredProduct.description,
            price: featuredProduct.price.replace("$", ""),
            stock: featuredProduct.stock,
            image_url: featuredProduct.image,
            category: featuredProduct.category,
          });
          setIsDemoProduct(true);
        } else {
          setProduct(null);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  async function handleAddToCart() {
    try {
      await addToCart(product.id, quantity, {
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        image_url: product.image_url,
        category: product.category,
        description: product.description,
        forceLocal: isDemoProduct,
      });
      setStatus("Added to cart.");
      openCart();
    } catch (error) {
      setStatus(error.response?.data?.quantity?.[0] || "Unable to add to cart.");
    }
  }

  async function handleBuyNow() {
    try {
      await addToCart(product.id, quantity, {
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        image_url: product.image_url,
        category: product.category,
        description: product.description,
        forceLocal: isDemoProduct,
      });
      navigate("/checkout");
    } catch (error) {
      setStatus(error.response?.data?.quantity?.[0] || "Unable to start checkout.");
    }
  }

  async function handleShare() {
    const shareUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setStatus("Product link copied.");
    } catch {
      setStatus("Unable to copy the product link.");
    }
  }

  function handleWishlist() {
    setWishlistActive((current) => {
      const next = !current;
      setStatus(next ? "Saved to wishlist." : "Removed from wishlist.");
      return next;
    });
  }

  if (loading) return <Loader label="Loading product..." />;
  if (!product) return <div className="glass-panel rounded-[24px] px-5 py-6 text-sm text-rose-300">Product not found.</div>;

  return (
    <div className="grid h-[calc(100vh-5rem)] lg:grid-cols-[1.2fr_1fr]">

      {/* LEFT: Sticky scroll-driven image */}
      <div className="relative hidden overflow-hidden lg:block">
        <motion.div
          style={{ scale: imageScale, rotate: imageRotate }}
          className="absolute inset-0"
        >
          {product.image_url ? (
            <img alt={product.name} src={product.image_url} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center bg-slate-800 text-5xl">
              {STORY_SLIDES[activeSlide].emoji}
            </div>
          )}
        </motion.div>

        {/* Story slide overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Floating slide indicator */}
        <div className="absolute bottom-10 left-10 right-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel rounded-[20px] p-5"
            >
              <div className="mb-1 text-xs uppercase tracking-[0.3em] text-cyan-300">
                {STORY_SLIDES[activeSlide].label}
              </div>
              <p className="text-base leading-relaxed text-slate-200">
                {STORY_SLIDES[activeSlide].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="mt-4 flex gap-2">
            {STORY_SLIDES.map((_, i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-full transition-all duration-500"
                style={{
                  background: i <= activeSlide ? "rgba(0,246,255,0.8)" : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Scroll container that drives the left panel */}
      <div ref={scrollRef} className="overflow-y-scroll">
        {/* Tall scroll area = drives the story */}
        <div className="min-h-[280vh] px-8 pt-12">

          {/* Sticky product info panel */}
          <div className="sticky top-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel grid content-start gap-6 rounded-[30px] p-8 shadow-soft"
            >
              <span className="inline-flex w-fit rounded-full border border-cyan-300/20 bg-cyan-300/8 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan-100">
                {product.category}
              </span>

              <div>
                <h1 className="text-3xl font-semibold text-white sm:text-4xl">{product.name}</h1>
                <p className="mt-3 text-base leading-7 text-slate-300">{product.description}</p>
              </div>

              <strong className="text-5xl font-bold text-white">${product.price}</strong>

              <p className="text-sm text-slate-400">
                {product.stock > 0 ? `${product.stock} pieces available` : "Out of stock"}
              </p>

              {/* ── Size Selector ── */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-300 tracking-wide">Select Size</span>
                  {selectedSize && (
                    <span className="text-xs text-cyan-400 uppercase tracking-[0.2em]">{selectedSize} selected</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      whileTap={{ scale: 0.94 }}
                      className={`relative h-11 min-w-[48px] rounded-2xl border px-4 text-sm font-medium transition-all duration-200 ${
                        selectedSize === size
                          ? "border-cyan-400/60 bg-cyan-400/10 text-white shadow-[0_0_0_1px_rgba(0,246,255,0.3),0_0_16px_rgba(0,246,255,0.12)]" 
                          : "border-white/8 bg-white/4 text-slate-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {size}
                      {selectedSize === size && (
                        <motion.span
                          layoutId="size-indicator"
                          className="absolute inset-0 rounded-2xl ring-1 ring-cyan-400/40"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="mt-2 text-xs text-slate-500">Please select a size before adding to cart</p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <input
                  className="h-12 w-24 rounded-full border border-white/10 bg-white/[0.04] px-4 text-white outline-none focus:border-cyan-300/40"
                  type="number" min="1" max={product.stock} value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <button
                  className={`premium-button flex-1 transition-opacity ${!selectedSize ? "opacity-40 cursor-not-allowed" : ""}`}
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                >
                  {selectedSize ? `Add to Cart — ${selectedSize}` : "Select a Size"}
                </button>
                <button
                  className={`premium-button-secondary flex-1 ${!selectedSize ? "opacity-40 cursor-not-allowed" : ""}`}
                  onClick={handleBuyNow}
                  disabled={!selectedSize}
                >
                  Buy Now
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <button className="premium-button-secondary w-full" onClick={handleWishlist}>
                  {wishlistActive ? "Wishlisted" : "Add to Wishlist"}
                </button>
                <button className="premium-button-secondary w-full" onClick={handleShare}>
                  Share
                </button>
                <Link className="premium-button-secondary w-full" to="/">
                  Continue Shopping
                </Link>
              </div>

              {status && (
                <div className="glass-panel rounded-[20px] px-4 py-3 text-sm text-slate-200">{status}</div>
              )}

              {isDemoProduct && (
                <div className="rounded-[20px] border border-amber-300/20 bg-amber-300/8 px-4 py-3 text-sm text-amber-100">
                  This product is running through the storefront demo commerce flow, so cart and checkout stay fully interactive even without a matching Django product record.
                </div>
              )}

              {/* Scroll hint */}
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                <svg className="h-3.5 w-3.5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                </svg>
                Scroll to discover the story
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
