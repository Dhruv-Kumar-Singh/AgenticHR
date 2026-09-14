import { Icon } from '@iconify/react';

const plans = [
  {
    name: 'Personal',
    badge: null,
    icon: 'solar:user-rounded-linear',
    price: 'Free',
    billing: 'Forever',
    tagline: 'For candidates preparing on their own.',
    highlighted: false,
    ctaText: 'Get Started',
    ctaVariant: 'secondary',
    features: [
      { text: 'Generate a custom interview from an uploaded syllabus, PDF, image, or document', bold: false },
      { text: 'AI-graded scoring with a full interview report', bold: false },
      { text: 'Actionable feedback to improve', bold: false },
    ],
  },
  {
    name: 'Premium',
    badge: 'Most Popular',
    icon: 'solar:crown-star-bold-duotone',
    price: '₹1,499',
    billing: '/ month',
    tagline: 'For candidates who want a deeper edge.',
    highlighted: true,
    ctaText: 'Get Premium',
    ctaVariant: 'primary',
    features: [
      { text: 'Everything in Personal', bold: true },
      { text: 'Frame-by-frame analysis of posture and expression', bold: false },
      { text: 'In-depth, detailed performance reports', bold: false },
      { text: 'Curated interview templates modeled on leading companies', bold: false },
    ],
  },
  {
    name: 'Professional',
    badge: null,
    icon: 'solar:buildings-3-linear',
    price: '₹14,999',
    billing: '/ month',
    tagline: 'For companies conducting hiring interviews.',
    highlighted: false,
    ctaText: 'Contact Sales',
    ctaVariant: 'secondary',
    features: [
      { text: 'Host and manage your own company-branded interviews', bold: false },
      { text: 'Detailed candidate reports delivered directly to your hiring team', bold: false },
      { text: 'Set custom qualifying criteria to filter results (e.g. minimum score thresholds)', bold: false },
      { text: 'Full access to interview recordings and frame-by-frame reports', bold: false },
    ],
  },
];

export default function PricingSection({ onGoToPremium, onGoToApp }) {
  return (
    <section className="z-10 py-32 relative bg-[#000] border-t border-white/10" id="plans">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 fade-up">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase">
              PLANS_MATRIX
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-white">
            Plans for Every Stage
          </h2>
          <p className="text-base text-neutral-400 max-w-xl font-light leading-relaxed">
            From individual practice to enterprise hiring — choose the plan that fits.
          </p>
        </div>

        {/* 3-Column Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch fade-up">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 md:p-10 flex flex-col justify-between relative transition-all duration-500 ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-[#111111] via-[#090909] to-[#040404] border border-white/30 shadow-[0_0_50px_rgba(255,255,255,0.06)] hover:border-white/50 hover:shadow-[0_0_70px_rgba(255,255,255,0.12)] md:-translate-y-2'
                  : 'bg-[#050505] border border-white/10 hover:border-white/20'
              }`}
            >
              {/* Highlight Atmospheric Glow */}
              {plan.highlighted && (
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
              )}

              {/* Card Header */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                      <Icon
                        icon={plan.icon}
                        className={`text-xl ${plan.highlighted ? 'text-white' : 'text-neutral-300'}`}
                      />
                    </div>
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      {plan.name}
                    </span>
                  </div>

                  {plan.badge && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-mono uppercase tracking-widest shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                      {plan.badge}
                    </div>
                  )}
                </div>

                {/* Price Display */}
                <div className="mt-2 mb-2 flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-bold tracking-tight text-white font-mono">
                    {plan.price}
                  </span>
                  <span className="text-sm font-mono text-neutral-400">
                    {plan.billing}
                  </span>
                </div>

                {/* Tagline */}
                <p className="text-sm text-neutral-400 font-light leading-relaxed min-h-[40px]">
                  {plan.tagline}
                </p>

                {/* Divider */}
                <div className="h-px bg-white/10 my-8 w-full" />

                {/* Feature List */}
                <div className="space-y-4 mb-10">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-3">
                    WHAT'S INCLUDED
                  </div>
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Icon
                        icon="solar:check-circle-bold-duotone"
                        className="text-emerald-400 text-lg flex-shrink-0 mt-0.5"
                      />
                      <span
                        className={`text-sm leading-relaxed ${
                          feat.bold ? 'text-white font-medium' : 'text-neutral-300 font-light'
                        }`}
                      >
                        {feat.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pinned CTA Button */}
              <div className="mt-auto pt-4">
                {plan.ctaVariant === 'primary' ? (
                  <button
                    onClick={() => {
                      if (plan.name === 'Premium' && onGoToPremium) {
                        onGoToPremium();
                      } else if (onGoToApp) {
                        onGoToApp();
                      }
                    }}
                    className="w-full py-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{plan.ctaText}</span>
                    <Icon icon="solar:arrow-right-linear" className="text-base" />
                  </button>
                ) : (
                  <button
                    onClick={() => onGoToApp && onGoToApp()}
                    className="w-full py-4 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/10 text-white font-medium text-sm transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{plan.ctaText}</span>
                    <Icon icon="solar:arrow-right-linear" className="text-base" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
