'use client';

import { useState, useEffect } from 'react';

// ============================================================================
// ICONS
// ============================================================================

const Icons = {
  Menu: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Close: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Check: () => (
    <svg className="w-5 h-5 text-dt-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Dumbbell: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12h2m14 0h2M6 12a2 2 0 012-2h8a2 2 0 012 2v0a2 2 0 01-2 2H8a2 2 0 01-2-2v0z" />
    </svg>
  ),
  Heart: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  Chart: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Video: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  Chat: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  Target: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Instagram: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  Mail: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Arrow: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  ),
};

// ============================================================================
// NAVIGATION
// ============================================================================

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#leistungen', label: 'Leistungen' },
    { href: '#transformation', label: 'Transformation' },
    { href: '#ueber', label: 'Über mich' },
    { href: '#kontakt', label: 'Kontakt' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-dt-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold">
              DT<span className="text-dt-orange">.</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-dt-muted hover:text-dt-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#kontakt"
              className="px-5 py-2.5 bg-dt-orange text-white text-sm font-semibold rounded-full hover:bg-dt-orange-light transition-colors"
            >
              Jetzt starten
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <Icons.Close /> : <Icons.Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-dt-gray pt-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-dt-muted hover:text-dt-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#kontakt"
              className="block mt-4 px-5 py-3 bg-dt-orange text-white text-center font-semibold rounded-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Jetzt starten
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dt-black via-dt-dark to-dt-black" />
      
      {/* Orange glow effect */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-dt-orange/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-dt-orange/5 rounded-full blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
        <p className="text-dt-orange font-semibold tracking-widest uppercase mb-4">
          Personal Coaching
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
          DEIN KÖRPER.
          <br />
          <span className="text-gradient">DEIN POTENZIAL.</span>
        </h1>
        <p className="text-lg md:text-xl text-dt-muted max-w-2xl mx-auto mb-10">
          Individuelles Coaching auf höchstem Niveau – maßgeschneidert für deine Ziele, 
          basierend auf neuester Studienlage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#kontakt"
            className="group px-8 py-4 bg-dt-orange text-white font-semibold rounded-full hover:bg-dt-orange-light transition-all flex items-center justify-center gap-2"
          >
            Kostenlose Beratung
            <Icons.Arrow />
          </a>
          <a
            href="#leistungen"
            className="px-8 py-4 border border-dt-gray text-dt-white font-semibold rounded-full hover:border-dt-orange hover:text-dt-orange transition-all"
          >
            Mehr erfahren
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div>
            <p className="font-display text-3xl md:text-4xl font-bold text-dt-orange">100%</p>
            <p className="text-sm text-dt-muted mt-1">Individuell</p>
          </div>
          <div>
            <p className="font-display text-3xl md:text-4xl font-bold text-dt-orange">24/7</p>
            <p className="text-sm text-dt-muted mt-1">Support</p>
          </div>
          <div>
            <p className="font-display text-3xl md:text-4xl font-bold text-dt-orange">365</p>
            <p className="text-sm text-dt-muted mt-1">Tage im Jahr</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-dt-muted rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-dt-orange rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SERVICES SECTION
// ============================================================================

function ServicesSection() {
  const services = [
    {
      icon: <Icons.Dumbbell />,
      title: 'Individuelle Pläne',
      description: 'Nach neuester Studienlage – perfekt auf dich abgestimmt.',
    },
    {
      icon: <Icons.Heart />,
      title: 'Gesundheitsoptimierung',
      description: 'Ganzheitlicher Ansatz für maximale Ergebnisse.',
    },
    {
      icon: <Icons.Chart />,
      title: 'Blutbildanalysen',
      description: 'Datenbasierte Einblicke in deinen Gesundheitszustand.',
    },
    {
      icon: <Icons.Video />,
      title: 'Ausführungskontrollen',
      description: 'Technik-Feedback für sicheres und effektives Training.',
    },
    {
      icon: <Icons.Chat />,
      title: '24/7 Chat-Support',
      description: 'Jederzeit erreichbar – für alle deine Fragen.',
    },
    {
      icon: <Icons.Target />,
      title: 'Wöchentliche Kontrollen',
      description: 'Fortschritt messen, Pläne anpassen, Ziele erreichen.',
    },
  ];

  return (
    <section id="leistungen" className="py-24 bg-dt-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-dt-orange font-semibold tracking-widest uppercase mb-4">
            Was dich erwartet
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            MEINE LEISTUNGEN
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 bg-dt-gray rounded-2xl border border-dt-light hover:border-dt-orange/50 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-dt-orange/10 rounded-xl flex items-center justify-center text-dt-orange mb-6 group-hover:bg-dt-orange group-hover:text-white transition-all">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-dt-muted">{service.description}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-dt-muted mt-12">
          Keine festen Preise – jedes Coaching ist individuell auf dich zugeschnitten.
        </p>
      </div>
    </section>
  );
}

// ============================================================================
// TRANSFORMATION SECTION
// ============================================================================

function TransformationSection() {
  return (
    <section id="transformation" className="py-24 bg-dt-black relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dt-orange/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-dt-orange font-semibold tracking-widest uppercase mb-4">
            Meine Reise
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            VON 200KG ZUR BESTFORM
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Transformation comparison */}
          <div className="relative bg-dt-dark rounded-3xl p-8 md:p-12 border border-dt-gray">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Before */}
              <div className="text-center">
                <div className="aspect-[3/4] bg-dt-gray rounded-2xl mb-4 flex items-center justify-center">
                  <span className="text-dt-muted">Vorher-Bild</span>
                </div>
                <p className="text-dt-muted">200kg</p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-dt-orange rounded-full items-center justify-center z-10">
                <Icons.Arrow />
              </div>

              {/* After */}
              <div className="text-center">
                <div className="aspect-[3/4] bg-dt-gray rounded-2xl mb-4 flex items-center justify-center glow-orange">
                  <span className="text-dt-muted">Nachher-Bild</span>
                </div>
                <p className="text-dt-orange font-semibold">90kg • 7% KFA</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-dt-gray">
              <div className="text-center">
                <p className="font-display text-2xl md:text-3xl font-bold text-dt-orange">-110kg</p>
                <p className="text-sm text-dt-muted">Gewicht verloren</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl md:text-3xl font-bold text-dt-orange">7%</p>
                <p className="text-sm text-dt-muted">Körperfett</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl md:text-3xl font-bold text-dt-orange">100%</p>
                <p className="text-sm text-dt-muted">Lebensqualität</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// ABOUT SECTION
// ============================================================================

function AboutSection() {
  return (
    <section id="ueber" className="py-24 bg-dt-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] bg-dt-gray rounded-3xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-dt-muted">
                David Portrait
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-dt-orange text-white px-6 py-4 rounded-2xl shadow-xl">
              <p className="font-display text-2xl font-bold">David Trebtau</p>
              <p className="text-sm opacity-80">Personal Coach</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-dt-orange font-semibold tracking-widest uppercase mb-4">
              Über mich
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              DEIN COACH.
              <br />
              <span className="text-gradient">DEIN PARTNER.</span>
            </h2>
            <div className="space-y-4 text-dt-muted mb-8">
              <p>
                Als Personal Coach begleite ich dich auf deinem Weg zu einem stärkeren, 
                gesünderen und leistungsfähigeren Körper – individuell, evidenzbasiert 
                und mit voller Hingabe.
              </p>
              <p>
                Mein Ansatz verbindet aktuelle wissenschaftliche Erkenntnisse mit 
                praktischer Erfahrung. Ob Muskelaufbau, Fettreduktion oder allgemeine 
                Gesundheitsoptimierung – gemeinsam finden wir den perfekten Plan für dich.
              </p>
              <p>
                Ich weiß, wie es ist, ganz unten zu sein. Mit über 200kg kämpfte ich 
                selbst gegen meinen Körper. Heute stehe ich bei 90kg, 7% Körperfett – 
                und dieser Weg hat mir alles gelehrt, was ich brauche, um dir zu helfen.
              </p>
            </div>

            {/* Checkmarks */}
            <ul className="space-y-3 mb-8">
              {[
                'Evidenzbasiertes Training',
                'Individuelle Ernährungspläne',
                '24/7 persönliche Betreuung',
                'Regelmäßige Erfolgskontrolle',
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Icons.Check />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 px-8 py-4 bg-dt-orange text-white font-semibold rounded-full hover:bg-dt-orange-light transition-all"
            >
              Lass uns sprechen
              <Icons.Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// CTA SECTION
// ============================================================================

function CTASection() {
  return (
    <section id="kontakt" className="py-24 bg-dt-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-dt-orange via-transparent to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <p className="text-dt-orange font-semibold tracking-widest uppercase mb-4">
          Starte jetzt
        </p>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
          BEREIT FÜR DEINE
          <br />
          <span className="text-gradient">TRANSFORMATION?</span>
        </h2>
        <p className="text-lg text-dt-muted mb-12 max-w-2xl mx-auto">
          Jedes Coaching ist individuell – keine festen Preise, keine Standardpakete. 
          Schreib mir und wir finden gemeinsam die beste Lösung für dich.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a
            href="https://instagram.com/davidtrebtau"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 bg-dt-orange text-white font-semibold rounded-full hover:bg-dt-orange-light transition-all flex items-center justify-center gap-3"
          >
            <Icons.Instagram />
            Schreib mir auf Instagram
          </a>
          <a
            href="mailto:kontakt@davidtrebtau.de"
            className="px-8 py-4 border border-dt-gray text-dt-white font-semibold rounded-full hover:border-dt-orange hover:text-dt-orange transition-all flex items-center justify-center gap-3"
          >
            <Icons.Mail />
            E-Mail senden
          </a>
        </div>

        <p className="text-sm text-dt-muted">
          Kostenlose Erstberatung • Keine Verpflichtungen
        </p>
      </div>
    </section>
  );
}

// ============================================================================
// FOOTER
// ============================================================================

function Footer() {
  return (
    <footer className="py-12 bg-dt-dark border-t border-dt-gray">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-bold">
              DT<span className="text-dt-orange">.</span>
            </span>
            <span className="text-dt-muted">Coaching</span>
          </div>

          <div className="flex gap-6 text-sm text-dt-muted">
            <a href="#" className="hover:text-dt-white transition-colors">Impressum</a>
            <a href="#" className="hover:text-dt-white transition-colors">Datenschutz</a>
          </div>

          <p className="text-sm text-dt-muted">
            © 2026 DT Coaching – David Trebtau
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <TransformationSection />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
