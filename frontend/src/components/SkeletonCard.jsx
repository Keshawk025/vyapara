function SkeletonCard() {
  return (
    <div className="glass-panel relative min-w-[270px] overflow-hidden rounded-[28px] p-4" style={{ scrollSnapAlign: "start", flexShrink: 0 }}>

      {/* Image area — matches real card's h-64 rounded image block */}
      <div className="shimmer h-64 rounded-[22px]" />

      {/* Bottom info block */}
      <div className="space-y-3 px-1 pb-1 pt-5">

        {/* Category eyebrow — narrow short pill */}
        <div className="shimmer h-3 w-16 rounded-full" />

        {/* Title + price row */}
        <div className="flex items-end justify-between gap-4">
          <div className="flex-1 space-y-2">
            {/* Product title */}
            <div className="shimmer h-5 w-4/5 rounded-full" />
            {/* Subtitle */}
            <div className="shimmer h-3.5 w-3/5 rounded-full" />
          </div>
          {/* Price */}
          <div className="shimmer h-5 w-10 rounded-full" />
        </div>
      </div>

      {/* Subtle outer glow to match hovered card aesthetic */}
      <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/5" />
    </div>
  );
}

export default SkeletonCard;
