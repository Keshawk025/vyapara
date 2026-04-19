import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function HomeIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="11" cy="11" r="6" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M3 5h2l2.2 9.2a1 1 0 0 0 1 .8h8.6a1 1 0 0 0 1-.78L20 8H7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="19" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="17" cy="19" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="3.25" />
      <path d="M5.5 19a6.5 6.5 0 0 1 13 0" strokeLinecap="round" />
    </svg>
  );
}

function MobileDock() {
  const { cart, openCart } = useCart();
  const cartCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <div className="fixed bottom-6 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-6 rounded-full border border-white/10 bg-slate-950/80 px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl md:hidden">
      <Link to="/" className="flex flex-col items-center gap-1 text-slate-400 hover:text-white">
        <HomeIcon />
        <span className="text-[10px] uppercase tracking-wider">Home</span>
      </Link>
      
      <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-white">
        <SearchIcon />
        <span className="text-[10px] uppercase tracking-wider">Search</span>
      </button>

      <button onClick={openCart} className="relative flex flex-col items-center gap-1 text-slate-400 hover:text-white">
        <div className="relative">
          <CartIcon />
          {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-400 text-[9px] font-bold text-slate-950">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] uppercase tracking-wider">Cart</span>
      </button>

      <Link to="/login" className="flex flex-col items-center gap-1 text-slate-400 hover:text-white">
        <UserIcon />
        <span className="text-[10px] uppercase tracking-wider">Profile</span>
      </Link>
    </div>
  );
}

export default MobileDock;
