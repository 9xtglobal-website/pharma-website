import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy-dark to-brand-navy">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-brand-green blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-brand-orange blur-3xl" />
      </div>

      <div className="container-main relative py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          {/* Trust badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm">
            <svg className="h-4 w-4 text-brand-green-light" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Quality-Assured Nutraceuticals
          </div>

          {/* Headline */}
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
            Science-Backed Wellness{" "}
            <span className="bg-gradient-to-r from-brand-green-light to-brand-green bg-clip-text text-transparent">
              for Every Day
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg lg:text-xl">
            Premium nutraceutical formulations designed to support your daily wellness routine.
            From vitality to restful sleep — choose what your body needs.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/products" className="btn-primary w-full text-lg sm:w-auto sm:px-8 sm:py-4">
              Shop Now
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link href="#products" className="btn-secondary w-full border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-auto">
              Explore Products
            </Link>
          </div>

          {/* Quick trust stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
            {[
              { stat: "3+", label: "Wellness Products" },
              { stat: "GMP", label: "Certified Manufacturing" },
              { stat: "100%", label: "Vegetarian" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-2xl font-bold text-white sm:text-3xl">{item.stat}</p>
                <p className="mt-1 text-xs text-white/50 sm:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
