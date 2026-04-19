function IconButton({ children, label }) {
  return (
    <button
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-200 transition-all duration-300 ease-premium hover:scale-105 hover:border-white/20 hover:bg-white/[0.08]"
      type="button"
    >
      {children}
    </button>
  );
}

export default IconButton;
