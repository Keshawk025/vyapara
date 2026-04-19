function Loader({ label = "Loading..." }) {
  return (
    <div className="glass-panel rounded-[24px] px-5 py-6 text-center text-sm text-slate-300 shadow-soft">
      {label}
    </div>
  );
}

export default Loader;
