export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-brown-200 px-5 py-3 flex items-center justify-between">
      <div className="text-base font-bold text-brown-700">
        🐄 <span className="text-farm-green">Moo</span>Translator
      </div>
      <a
        href="#dictionary"
        className="text-xs font-semibold text-brown-500 hover:text-brown-700 transition-colors"
      >
        Moo Dictionary
      </a>
    </nav>
  );
}
