import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import MobileDock from "./MobileDock";

function Layout({ children }) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { cart, openCart } = useCart();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  const cartCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const isLandingPage = location.pathname === "/";

  if (isLandingPage) {
    return (
      <div className="min-h-screen bg-canvas">
        <Navbar />
        <main>{children}</main>
        <CartDrawer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
        <div className="section-shell flex items-center justify-between py-5">
          <Link className="text-lg font-semibold tracking-[0.2em] text-white" to="/">VYAPARA</Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/orders">Orders</NavLink>
            <button onClick={openCart} className="transition-colors hover:text-white">Cart ({cartCount})</button>
            {!user && <NavLink to="/login">Login</NavLink>}
            {!user && <NavLink to="/register">Register</NavLink>}
            {user && <button className="text-slate-300 transition-colors hover:text-white" onClick={handleLogout}>Logout</button>}
          </nav>
        </div>
      </header>
      <main className="section-shell py-8">{children}</main>
      <CartDrawer />
      <MobileDock />
    </div>
  );
}

export default Layout;
