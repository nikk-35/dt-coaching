'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

const fadeInScale = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const slideInLeft = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
};

const slideInRight = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
};

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

function useParallax(value: any, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

// ============================================================================
// ANIMATED COUNTER
// ============================================================================

function AnimatedCounter({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = value;
    const stepTime = (duration * 1000) / end;
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ============================================================================
// MAGNETIC BUTTON
// ============================================================================

function MagneticButton({ children, className, href }: { children: React.ReactNode; className?: string; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = (clientX - left - width / 2) * 0.3;
    const y = (clientY - top - height / 2) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.a>
  );
}

// ============================================================================
// GLOWING ORB
// ============================================================================

function GlowingOrb({ className }: { className?: string }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[100px] ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <motion.a 
            href="#" 
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-display text-3xl font-black tracking-tight text-white">
              DT
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">.</span>
            </span>
            <motion.span
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300"
            />
          </motion.a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="relative text-sm font-medium text-zinc-400 hover:text-white transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
            <MagneticButton
              href="#kontakt"
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-orange-500/25 transition-shadow"
            >
              Jetzt starten
            </MagneticButton>
          </div>

          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white block"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-white block"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white block"
              />
            </div>
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-lg text-zinc-400 hover:text-white transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-black to-black" />
        <GlowingOrb className="w-[600px] h-[600px] bg-orange-500/30 top-1/4 -right-1/4" />
        <GlowingOrb className="w-[400px] h-[400px] bg-red-500/20 bottom-1/4 -left-1/4" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <motion.div style={{ y, opacity, scale }} className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-sm text-orange-400 font-medium">Personal Coaching</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] mb-6"
        >
          <span className="block text-white">DEIN</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 animate-gradient">
            KÖRPER
          </span>
          <span className="block text-zinc-400">DEIN POTENZIAL</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12"
        >
          Von <span className="text-white font-semibold">200kg</span> zur Bestform. 
          Individuelles Coaching auf Basis neuester Wissenschaft — 
          für deine <span className="text-orange-400">Transformation</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton
            href="#kontakt"
            className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-full overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Kostenlose Beratung
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </MagneticButton>
          
          <motion.a
            href="#transformation"
            className="px-8 py-4 border border-zinc-700 text-white font-semibold rounded-full hover:bg-white/5 transition-all flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Transformation sehen
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: 100, suffix: '%', label: 'Individuell' },
            { value: 24, suffix: '/7', label: 'Support' },
            { value: 365, suffix: '', label: 'Tage/Jahr' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="text-center"
            >
              <p className="font-display text-4xl md:text-5xl font-black text-white">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-zinc-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-zinc-600 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ height: ['20%', '80%', '20%'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 bg-gradient-to-b from-orange-500 to-transparent rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// SERVICES SECTION
// ============================================================================

function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    { icon: '💪', title: 'Individuelle Pläne', description: 'Nach neuester Studienlage — perfekt auf dich abgestimmt.' },
    { icon: '❤️', title: 'Gesundheitsoptimierung', description: 'Ganzheitlicher Ansatz für maximale Ergebnisse.' },
    { icon: '📊', title: 'Blutbildanalysen', description: 'Datenbasierte Einblicke in deinen Gesundheitszustand.' },
    { icon: '🎯', title: 'Ausführungskontrollen', description: 'Technik-Feedback für sicheres Training.' },
    { icon: '💬', title: '24/7 Chat-Support', description: 'Jederzeit erreichbar — für alle deine Fragen.' },
    { icon: '📈', title: 'Wöchentliche Kontrollen', description: 'Fortschritt messen, Pläne anpassen.' },
  ];

  return (
    <section id="leistungen" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-zinc-950" />
      <GlowingOrb className="w-[500px] h-[500px] bg-orange-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-orange-500 font-semibold tracking-widest uppercase text-sm">Was dich erwartet</span>
          <h2 className="font-display text-5xl md:text-7xl font-black mt-4 text-white">
            MEINE <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">LEISTUNGEN</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative p-8 rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 hover:border-orange-500/50 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center text-3xl mb-6"
              >
                {service.icon}
              </motion.div>
              
              <h3 className="relative text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="relative text-zinc-400">{service.description}</p>
              
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-b-3xl"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-zinc-500 mt-12"
        >
          Keine festen Preise — jedes Coaching ist <span className="text-orange-400">individuell</span> auf dich zugeschnitten.
        </motion.p>
      </div>
    </section>
  );
}

// ============================================================================
// TRANSFORMATION SECTION
// ============================================================================

function TransformationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const x1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const x2 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="transformation" ref={ref} className="relative py-32 overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-orange-900/30 via-black to-black" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-orange-500 font-semibold tracking-widest uppercase text-sm">Meine Reise</span>
          <h2 className="font-display text-5xl md:text-7xl font-black mt-4 text-white">
            VON <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">200KG</span> ZUR BESTFORM
          </h2>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Before */}
            <motion.div
              style={{ x: x1 }}
              initial={{ opacity: 0, x: -100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="aspect-[3/4] rounded-3xl bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden border border-zinc-800">
                <div className="w-full h-full flex items-center justify-center text-zinc-600">
                  <span className="text-xl">Vorher-Bild</span>
                </div>
              </div>
              <div className="absolute -bottom-4 left-4 right-4 bg-zinc-900/90 backdrop-blur-sm rounded-2xl p-4 border border-zinc-800">
                <p className="text-3xl font-black text-zinc-400">200kg</p>
                <p className="text-sm text-zinc-500">Der Anfang</p>
              </div>
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center shadow-2xl shadow-orange-500/50">
                <motion.svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              style={{ x: x2 }}
              initial={{ opacity: 0, x: 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <div className="aspect-[3/4] rounded-3xl bg-gradient-to-b from-orange-500/20 to-zinc-900 overflow-hidden border border-orange-500/30 shadow-2xl shadow-orange-500/20">
                <div className="w-full h-full flex items-center justify-center text-zinc-600">
                  <span className="text-xl">Nachher-Bild</span>
                </div>
              </div>
              <div className="absolute -bottom-4 left-4 right-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-4 shadow-xl shadow-orange-500/30">
                <p className="text-3xl font-black text-white">90kg</p>
                <p className="text-sm text-orange-100">7% Körperfett</p>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 grid grid-cols-3 gap-8"
          >
            {[
              { value: '-110', unit: 'kg', label: 'Gewicht verloren' },
              { value: '7', unit: '%', label: 'Körperfett' },
              { value: '100', unit: '%', label: 'Lebensqualität' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800"
              >
                <p className="font-display text-4xl md:text-5xl font-black">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">{stat.value}</span>
                  <span className="text-zinc-400">{stat.unit}</span>
                </p>
                <p className="text-sm text-zinc-500 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// ABOUT SECTION
// ============================================================================

function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const checkmarks = [
    'Evidenzbasiertes Training',
    'Individuelle Ernährungspläne',
    '24/7 persönliche Betreuung',
    'Regelmäßige Erfolgskontrolle',
  ];

  return (
    <section id="ueber" ref={ref} className="relative py-32 overflow-hidden bg-zinc-950">
      <GlowingOrb className="w-[600px] h-[600px] bg-orange-500/10 -top-1/4 -right-1/4" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden border border-zinc-800">
              <div className="w-full h-full flex items-center justify-center text-zinc-600">
                David Portrait
              </div>
            </div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-6 rounded-2xl shadow-2xl shadow-orange-500/30"
            >
              <p className="font-display text-2xl font-black">David Trebtau</p>
              <p className="text-orange-100">Personal Coach</p>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-6 -left-6 bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-xl"
            >
              <p className="text-orange-400 font-bold">5+ Jahre</p>
              <p className="text-xs text-zinc-500">Erfahrung</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-orange-500 font-semibold tracking-widest uppercase text-sm">Über mich</span>
            <h2 className="font-display text-5xl md:text-6xl font-black mt-4 mb-6 text-white">
              DEIN COACH.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">DEIN PARTNER.</span>
            </h2>
            
            <div className="space-y-4 text-zinc-400 mb-8">
              <p>
                Als Personal Coach begleite ich dich auf deinem Weg zu einem stärkeren, 
                gesünderen und leistungsfähigeren Körper — <span className="text-white">individuell, evidenzbasiert 
                und mit voller Hingabe</span>.
              </p>
              <p>
                Ich weiß, wie es ist, ganz unten zu sein. Mit über <span className="text-orange-400 font-semibold">200kg</span> kämpfte ich 
                selbst gegen meinen Körper. Heute stehe ich bei <span className="text-orange-400 font-semibold">90kg, 7% Körperfett</span> — 
                und dieser Weg hat mir alles gelehrt, was ich brauche, um dir zu helfen.
              </p>
            </div>

            <ul className="space-y-4 mb-10">
              {checkmarks.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white">{item}</span>
                </motion.li>
              ))}
            </ul>

            <MagneticButton
              href="#kontakt"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-orange-500/25 transition-shadow"
            >
              Lass uns sprechen
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// CTA SECTION
// ============================================================================

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="kontakt" ref={ref} className="relative py-32 overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/40 via-black to-black" />
        <GlowingOrb className="w-[800px] h-[800px] bg-orange-500/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-orange-500 font-semibold tracking-widest uppercase text-sm">Starte jetzt</span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-black mt-4 mb-6 text-white">
            BEREIT FÜR DEINE<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 animate-gradient">TRANSFORMATION?</span>
          </h2>
          <p className="text-lg text-zinc-400 mb-12 max-w-2xl mx-auto">
            Jedes Coaching ist individuell — keine festen Preise, keine Standardpakete. 
            Schreib mir und wir finden gemeinsam die beste Lösung für dich.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <MagneticButton
            href="https://instagram.com/davidtrebtau"
            className="group px-8 py-5 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-full flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-orange-500/30 transition-all"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Schreib mir auf Instagram
          </MagneticButton>
          
          <motion.a
            href="mailto:kontakt@davidtrebtau.de"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-5 border border-zinc-700 text-white font-semibold rounded-full hover:bg-white/5 transition-all flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            E-Mail senden
          </motion.a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-sm text-zinc-500"
        >
          Kostenlose Erstberatung • Keine Verpflichtungen
        </motion.p>
      </div>
    </section>
  );
}

// ============================================================================
// FOOTER
// ============================================================================

function Footer() {
  return (
    <footer className="py-12 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-black">
              DT<span className="text-orange-500">.</span>
            </span>
            <span className="text-zinc-500">Coaching</span>
          </div>

          <div className="flex gap-6 text-sm text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Impressum</a>
            <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
          </div>

          <p className="text-sm text-zinc-600">
            © 2026 DT Coaching — David Trebtau
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
