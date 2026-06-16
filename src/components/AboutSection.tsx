import { siteConfig } from "@/lib/config";

export default function AboutSection() {
  return (
    <>
      <section className="px-5 py-10 bg-farm-green text-center">
        <h2 className="text-xl font-bold text-cream mb-3">
          Why are we doing this?
        </h2>
        <p className="text-sm text-cream/85 leading-relaxed mb-6 max-w-sm mx-auto">
          At Two Brothers Organic Farms, we believe healthy food should come
          with a smile. So we created Moo Language — a playful way to connect
          with our community. Every moo has a meaning, and every member of our
          herd is special.
        </p>
        <a
          href={siteConfig.farmUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-beige text-brown-700 font-bold text-sm px-6 py-2.5 rounded-full hover:bg-beige-dark transition-colors"
        >
          Visit Two Brothers Organic Farms 🌿
        </a>
      </section>

      <footer className="bg-brown-800 px-5 py-6 text-center">
        <p className="text-xs text-cream/60">
          Made with 🤍 by{" "}
          <a
            href={siteConfig.farmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-beige hover:text-cream transition-colors"
          >
            Two Brothers Organic Farms
          </a>
        </p>
        <p className="text-xs text-cream/40 mt-1">Mooooooo. That&apos;s all folks.</p>
      </footer>
    </>
  );
}
