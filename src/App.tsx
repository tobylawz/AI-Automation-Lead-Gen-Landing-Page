import { useState, useEffect, useRef, type ReactNode } from 'react';

// ─── Fade-in hook ─────────────────────────────────────────────────────────────
function useFadeInOnScroll(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// ─── Reusable wrapper for scroll-triggered fade-in ────────────────────────────
function FadeIn({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useFadeInOnScroll();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToAudit = () => {
    const el = document.getElementById('audit');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? '#0F0F0F' : 'transparent',
        borderBottom: scrolled ? '1px solid #222222' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-sm font-medium tracking-widest uppercase text-[#F0F0F0]">
          Meridian Systems
        </span>
        <button
          onClick={scrollToAudit}
          className="text-sm font-medium text-[#F0F0F0] border border-[#333] rounded-md px-4 py-2 hover:border-[#555] hover:bg-[#161616] transition-colors duration-200"
        >
          Request an Audit
        </button>
      </div>
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const scrollToAudit = () => {
    const el = document.getElementById('audit');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-16">
      <div className="max-w-6xl w-full">
        <div
          className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-6"
          style={{ animation: 'fadeSlideUp 600ms ease-out 150ms both' }}
        >
          Operational Efficiency · AI Systems
        </div>

        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#F0F0F0] leading-[1.1] mb-8"
          style={{ animation: 'fadeSlideUp 600ms ease-out 150ms both' }}
        >
          Your team is spending time
          <br />
          on work that shouldn't
          <br />
          require a human.
        </h1>

        <p
          className="text-lg md:text-xl text-[#888888] max-w-[560px] font-normal mb-10"
          style={{ animation: 'fadeSlideUp 600ms ease-out 300ms both' }}
        >
          We design automation systems that remove operational drag — not with off-the-shelf tools, but with workflows built around how your business actually runs.
        </p>

        <div style={{ animation: 'fadeSlideUp 600ms ease-out 450ms both' }}>
          <button
            onClick={scrollToAudit}
            className="inline-block bg-[#C8F04D] text-[#0A0A0A] px-8 py-4 rounded-md font-semibold text-base hover:brightness-95 transition-all duration-200"
          >
            Request an Automation Audit
          </button>
          <p className="mt-4 text-sm text-[#888888]">
            No commitment. No sales call. Just clarity.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Who This Is For Section ──────────────────────────────────────────────────
function WhoItsForSection() {
  const goodFit = [
    'You run a business with real operations — sales, fulfillment, support, reporting',
    'Your team does repetitive manual work that follows a predictable pattern',
    "You've looked at AI tools but aren't sure what actually applies to your situation",
    'You want to understand the opportunity before committing to anything',
    "You're a founder or operator who values clarity over hype",
  ];

  const badFit = [
    "You're looking for a magic button that automates everything overnight",
    "You're running a hobby project or early-stage experiment with no real workflows yet",
    'You expect results without any internal cooperation or process documentation',
    'You want a vendor to just "handle it" without understanding your business',
  ];

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-4">
            Fit
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F0] leading-tight mb-16">
            Built for operators.
            <br />
            Not for everyone.
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          <FadeIn delay={150}>
            <div className="border border-[#222222] bg-[#111111] rounded-lg p-8 md:p-10">
              <h3 className="text-lg font-semibold text-[#F0F0F0] mb-6">
                This is for you if:
              </h3>
              <ul className="space-y-4">
                {goodFit.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#888888] text-sm leading-relaxed">
                    <span className="text-[#C8F04D] mt-0.5 shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={250}>
            <div className="border border-[#222222] bg-[#111111] rounded-lg p-8 md:p-10">
              <h3 className="text-lg font-semibold text-[#F0F0F0] mb-6">
                This probably isn't for you if:
              </h3>
              <ul className="space-y-4">
                {badFit.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#888888] text-sm leading-relaxed">
                    <span className="text-[#555555] mt-0.5 shrink-0">×</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works Section ─────────────────────────────────────────────────────
function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Understand the current system',
      desc: "We start by mapping how your business actually operates — not how it's supposed to work on paper. We look at tools, handoffs, team habits, and where time is being spent.",
    },
    {
      num: '02',
      title: 'Identify bottlenecks and waste',
      desc: 'We pinpoint the specific tasks and transitions that create friction, delay, or require manual intervention. Not everything is worth automating — we focus on what has real leverage.',
    },
    {
      num: '03',
      title: 'Design practical automations',
      desc: 'We propose workflows that fit your existing operations. No ripping things out. No platform migrations. Just targeted systems that reduce the manual load where it matters most.',
    },
    {
      num: '04',
      title: 'Decide together what makes sense',
      desc: "You get a clear picture of what's possible, what it would take, and what the tradeoff is. There's no pressure to proceed. The audit is useful whether or not we work together.",
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-4">
            Process
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F0] leading-tight mb-16">
            A straightforward process.
            <br />
            No black boxes.
          </h2>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={150 + i * 100}>
              <div className="relative border border-[#222222] bg-[#111111] rounded-lg p-8 h-full">
                <div className="text-6xl font-bold text-[#F0F0F0] opacity-20 leading-none mb-4">
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold text-[#F0F0F0] mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-[#888888] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Credibility Section ──────────────────────────────────────────────────────
function CredibilitySection() {
  const stats = [
    { value: '8+', label: 'Years working with operational systems and data' },
    { value: '40+', label: 'Automations running in production environments' },
    { value: '12', label: "Industries where we've mapped and improved workflows" },
  ];

  const industries = [
    'Professional Services',
    'E-commerce & Fulfillment',
    'Healthcare Admin',
    'Financial Operations',
    'Agency & Creative',
    'SaaS & Tech Teams',
  ];

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-4">
            Experience
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F0] leading-tight mb-16">
            We've worked inside real operations.
          </h2>
        </FadeIn>

        <div className="grid sm:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, i) => (
            <FadeIn key={stat.value} delay={150 + i * 100}>
              <div className="text-center">
                <div className="text-5xl font-bold text-[#C8F04D] mb-3">
                  {stat.value}
                </div>
                <div className="text-sm text-[#888888] max-w-[240px] mx-auto leading-relaxed">
                  {stat.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={400}>
          <p className="text-center text-sm text-[#888888] max-w-2xl mx-auto mb-10 leading-relaxed">
            We don't come from a software background. We come from operations — which means we understand the constraints, the edge cases, and the people involved.
          </p>
        </FadeIn>

        <FadeIn delay={500}>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((ind) => (
              <span
                key={ind}
                className="inline-block px-4 py-2 text-xs font-medium text-[#888888] border border-[#222222] bg-[#111111] rounded-full"
              >
                {ind}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Audit Offer Section ──────────────────────────────────────────────────────
function AuditOfferSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    'w-full bg-[#0A0A0A] border border-[#222222] rounded-md px-4 py-3 text-sm text-[#F0F0F0] placeholder-[#555555] focus:outline-none focus:border-[#444444] transition-colors';

  return (
    <section id="audit" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-4">
            The Offer
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <FadeIn delay={100}>
              <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F0] leading-tight mb-8">
                Free Automation Audit
              </h2>
            </FadeIn>
            <FadeIn delay={150}>
              <div className="space-y-5 text-[#888888] text-base leading-relaxed">
                <p>
                  The audit is a structured review of your current workflows — how work moves through your business, where it slows down, and where automation could realistically help.
                </p>
                <p>
                  You'll come away with a clear map of your highest-leverage opportunities, an honest assessment of complexity and effort, and a plain-language recommendation — regardless of whether we work together afterward.
                </p>
                <p className="text-[#F0F0F0] font-medium">
                  There's no pitch at the end. The audit is the value.
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={200}>
            <div className="border border-[#222222] bg-[#111111] rounded-lg p-8 md:p-10">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="text-[#C8F04D] text-2xl mb-4">✓</div>
                  <p className="text-[#F0F0F0] text-lg font-medium mb-2">
                    Request received.
                  </p>
                  <p className="text-[#888888] text-sm">
                    We'll be in touch within 1–2 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    className={inputClass}
                  />
                  <input
                    type="email"
                    placeholder="Business email"
                    required
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="Company name"
                    required
                    className={inputClass}
                  />
                  <textarea
                    placeholder="What does your business do? (brief description)"
                    rows={3}
                    required
                    className={inputClass + ' resize-none'}
                  />
                  <textarea
                    placeholder="Where do you feel the most operational drag right now?"
                    rows={3}
                    required
                    className={inputClass + ' resize-none'}
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#C8F04D] text-[#0A0A0A] font-semibold py-4 rounded-md hover:brightness-95 transition-all duration-200 mt-2"
                  >
                    Request My Free Audit
                  </button>
                  <p className="text-xs text-[#888888] text-center mt-3">
                    We respond within 1–2 business days. No spam. No automated sequences.
                  </p>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── What Happens Next Section ────────────────────────────────────────────────
function WhatHappensNextSection() {
  const steps = [
    {
      title: 'We review your submission',
      desc: "We read what you've shared and do some initial research on your business and industry before we respond.",
    },
    {
      title: 'Short intro call (30 minutes)',
      desc: "We schedule a focused call to ask clarifying questions about your workflows. This is not a sales call. We're gathering information.",
    },
    {
      title: 'We send you the audit',
      desc: 'Within a few days of the call, you receive a written audit — a clear breakdown of your workflow, identified bottlenecks, and specific automation opportunities with honest effort estimates.',
    },
    {
      title: 'You decide what to do next',
      desc: 'The audit stands on its own. If you want to move forward with implementation, we can discuss that. If not, you have something genuinely useful regardless.',
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-4">
            After You Submit
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F0] leading-tight mb-16">
            Here's exactly what to expect.
          </h2>
        </FadeIn>

        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-[#222222] hidden sm:block" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <FadeIn key={i} delay={150 + i * 100}>
                <div className="flex gap-6 items-start">
                  <div className="hidden sm:flex shrink-0 w-6 h-6 rounded-full bg-[#161616] border border-[#222222] items-center justify-center z-10 mt-1">
                    <div className="w-2 h-2 rounded-full bg-[#C8F04D]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#F0F0F0] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#888888] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA Section ────────────────────────────────────────────────────────
function FinalCTASection() {
  const scrollToAudit = () => {
    const el = document.getElementById('audit');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-32 md:py-40 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <FadeIn>
          <div className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-4">
            Ready when you are
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F0F0F0] leading-tight mb-8">
            Start with a conversation,
            <br />
            not a commitment.
          </h2>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="text-base text-[#888888] max-w-[480px] mx-auto mb-10 leading-relaxed">
            The audit is free. The process is transparent. And you stay in control of every decision.
          </p>
        </FadeIn>
        <FadeIn delay={300}>
          <button
            onClick={scrollToAudit}
            className="inline-block bg-[#C8F04D] text-[#0A0A0A] px-8 py-4 rounded-md font-semibold text-base hover:brightness-95 transition-all duration-200"
          >
            Request an Automation Audit
          </button>
          <p className="mt-4 text-sm text-[#888888]">
            No pricing. No pressure. No automated follow-up sequences.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-[#222222] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-[#888888]">© 2025 Meridian Systems</span>
        <span className="text-xs text-[#888888]">hello@meridiansystems.io</span>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F0F0F0] font-sans antialiased">
      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <Navbar />
      <HeroSection />
      <WhoItsForSection />
      <HowItWorksSection />
      <CredibilitySection />
      <AuditOfferSection />
      <WhatHappensNextSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}

export default App;
