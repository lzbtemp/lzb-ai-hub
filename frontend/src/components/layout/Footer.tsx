export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#1B3A6B] to-[#0f2140] mt-auto overflow-hidden">
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '48px 48px'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <img
          src="/lazboy-logo.png"
          alt="La-Z-Boy"
          className="h-8 mx-auto mb-5 brightness-0 invert opacity-60"
        />
        <p className="text-center text-sm text-white/40 font-light">
          Skills Repository &mdash; Internal use only
        </p>
        <p className="text-center text-xs text-white/20 mt-2 italic tracking-wide">
          Live life comfortably.&reg;
        </p>
      </div>
    </footer>
  );
}
