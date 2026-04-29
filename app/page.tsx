'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Menu, X, Phone, Mail, MapPin, ArrowRight, CheckCheck, 
  Loader2, ImageOff, Flower2, Leaf, ShieldCheck, Users, 
  Instagram, Search, ShoppingBag, Wind
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-RULE
// Typography Personality: refined

const brand = {
  name: "HTB Scent & Burnings",
  tagline: "Elevate Your Essence, Ignite Your Soul.",
  description: "An artisanal sanctuary in Wuse, Abuja, dedicated to curated fragrances and spiritual wellness. We blend ancient botanical wisdom with modern luxury to transform your space into a temple of tranquility and natural harmony.",
  industry: "beauty",
  region: "nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1583182363039-59eac8609ab2?auto=format&fit=crop&q=80&w=1920",
  products: [
    "https://images.unsplash.com/photo-1599022509786-23794c1b68c2?auto=format&fit=crop&q=80&w=1080",
    "https://images.unsplash.com/photo-1773527143923-4b2af679c7a6?auto=format&fit=crop&q=80&w=1080",
    "https://images.unsplash.com/photo-1759563871375-d5b140f6646e?auto=format&fit=crop&q=80&w=1080",
    "https://images.unsplash.com/photo-1636302925653-c79bd8b6749f?auto=format&fit=crop&q=80&w=1080"
  ],
  gallery: [
    "https://images.unsplash.com/photo-1592967833769-60d8693bbf91?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1765031117402-93b2e530edec?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1717154205778-dabb3ace2c9b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1628709353367-35f0bb07413d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1750433101196-604c1741a012?auto=format&fit=crop&q=80&w=800"
  ]
};

const products = [
  { name: "Sacred Oud Incense", description: "Hand-rolled with ritualistic intent and rare resins.", price: "₦15,500" },
  { name: "Midnight Bloom Soy Candle", description: "A slow-burning luxury blend for spiritual clarity.", price: "₦12,500" },
  { name: "White Sage Purification Bundle", description: "Wild-harvested sage for cleansing your sacred spaces.", price: "₦8,000" },
  { name: "Botanical Essence Mist", description: "Pure plant distillates to refresh your aura and home.", price: "₦18,200" }
];

const features = [
  { title: "Spiritual Purity", description: "Every scent is curated with intention to elevate your vibration.", icon: Flower2 },
  { title: "Ethically Sourced", description: "We prioritize natural, sustainable ingredients from local artisans.", icon: Leaf },
  { title: "Abuja Exclusive", description: "Crafted and hand-poured in the heart of Wuse for premium quality.", icon: MapPin }
];

const testimonials = [
  { name: "Nneka Adeyemi", text: "The Midnight Bloom candle has completely transformed my evening meditation. Truly a luxury experience.", role: "Verified Customer" },
  { name: "Ibrahim Bello", text: "Best incense in Abuja. You can tell they use real resins, not just synthetic perfume.", role: "Loyal Client" }
];

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-accent/10 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-accent/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroReveal = useScrollReveal(0.1);
  const aboutReveal = useScrollReveal(0.2);
  const productsReveal = useScrollReveal(0.15);
  const galleryReveal = useScrollReveal(0.15);
  const featuresReveal = useScrollReveal(0.2);
  const testimonialsReveal = useScrollReveal(0.2);
  const contactReveal = useScrollReveal(0.2);

  return (
    <main className="min-h-screen bg-primary">
      {/* HEADER */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-primary/90 backdrop-blur-xl py-4 shadow-sm' : 'bg-transparent py-8'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="text-2xl font-heading font-bold tracking-tighter text-accent flex items-center gap-2">
            <div className="w-10 h-10 border border-accent/20 flex items-center justify-center font-heading italic text-xl">HTB</div>
            <span className="hidden sm:inline">HTB SCENT</span>
          </a>
          
          <div className="hidden md:flex items-center gap-12">
            {[
              { name: "Home", href: "#home" },
              { name: "Our Story", href: "#about" },
              { name: "The Ritual", href: "#products" },
              { name: "Contact", href: "#contact" }
            ].map(link => (
              <a key={link.name} href={link.href} className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-accent/70 hover:text-accent transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="#products" className="hidden sm:block bg-accent text-primary px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all">
              Experience The Ritual
            </a>
            <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-accent p-2">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-accent/20 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary p-12 flex flex-col shadow-2xl">
          <button onClick={() => setIsMenuOpen(false)} className="self-end p-2 text-accent mb-12">
            <X size={28} />
          </button>
          <div className="space-y-8">
            {[
              { name: "Home", href: "#home" },
              { name: "Our Story", href: "#about" },
              { name: "The Ritual", href: "#products" },
              { name: "Contact", href: "#contact" }
            ].map(link => (
              <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="block font-heading text-4xl font-light text-accent">
                {link.name}
              </a>
            ))}
          </div>
          <div className="mt-auto border-t border-accent/10 pt-12">
            <p className="text-accent/60 text-sm font-sans mb-4">Wuse, Abuja</p>
            <div className="flex gap-4">
              <Instagram className="text-accent" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* HERO - HR-B Variant V1 */}
      <section id="home" className="min-h-screen relative flex items-end pb-32 px-6 md:px-16 overflow-hidden">
        <SafeImage src={IMAGES.hero} alt="Artisanal Sanctuary" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent" />
        
        <div ref={heroReveal.ref} className={`relative z-10 max-w-4xl transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="font-heading text-6xl md:text-[7rem] font-medium text-accent leading-[0.9] tracking-tight">
            Sacred Scents for the <br /><span className="italic">Modern Sanctuary</span>
          </h1>
          <p className="text-accent/70 mt-8 text-xl max-w-xl leading-relaxed font-light">
            Experience the intersection of warm luxury and spiritual wellness with our artisanal fragrance collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 mt-12">
            <a href="#products" className="bg-accent text-primary px-10 py-5 font-bold text-sm uppercase tracking-widest hover:brightness-125 transition-all text-center">
              Experience The Ritual
            </a>
            <a href="#about" className="group flex items-center gap-3 text-accent font-semibold tracking-widest text-sm uppercase self-center px-4 py-2">
              Our Story <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT - V3 Horizontal Split */}
      <section id="about" ref={aboutReveal.ref} className="py-32 px-6 bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <span className="font-sans text-xs uppercase tracking-[0.4em] font-bold text-accent/40 mb-4 block">Est. In Wuse, Abuja</span>
            <h2 className="font-heading text-5xl md:text-6xl font-medium text-accent mb-8 leading-tight">Our Sacred Story</h2>
            <p className="text-accent/60 text-lg leading-relaxed mb-10 font-light italic">
              HTB Scent & Burnings began with a simple mission: to bring the calming power of nature into the modern home. 
              Based in Wuse, we believe that scent is more than just a fragrance—it is a spiritual journey that grounds the soul and illuminates the space.
            </p>
            <div className="grid grid-cols-2 gap-12 border-t border-accent/10 pt-10">
              <div>
                <p className={`font-heading text-5xl font-medium text-accent transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>2,782+</p>
                <p className="text-accent/40 text-xs uppercase tracking-widest mt-2 font-bold">Happy Clients</p>
              </div>
              <div>
                <p className={`font-heading text-5xl font-medium text-accent transition-all duration-1000 delay-500 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>100%</p>
                <p className="text-accent/40 text-xs uppercase tracking-widest mt-2 font-bold">Natural Ingredients</p>
              </div>
            </div>
          </div>
          <div className={`relative aspect-[4/5] rounded-[4rem] overflow-hidden transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <SafeImage src={IMAGES.gallery[0]} alt="Botanical wisdom" fill className="object-cover" />
            <div className="absolute inset-0 border-[24px] border-primary/10" />
          </div>
        </div>
      </section>

      {/* D-RULE DIVIDER */}
      <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <span className="text-accent/40 font-heading italic text-lg tracking-widest uppercase whitespace-nowrap">
          {brand.tagline}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>

      {/* THE RITUAL (PRODUCTS) - P-STAGGER Variant V4 */}
      <section id="products" ref={productsReveal.ref} className="py-32 px-6 bg-secondary/20 overflow-hidden">
        <div className="max-w-6xl mx-auto mb-24 text-center">
          <h2 className="font-heading text-5xl md:text-7xl font-medium text-accent mb-6">The Ritual Collection</h2>
          <p className="text-accent/50 text-xl font-light">Curated burnings to cleanse, calm, and captivate.</p>
        </div>
        
        <div className="max-w-6xl mx-auto space-y-32">
          {products.map((p, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 transition-all duration-1000 ${productsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ transitionDelay: `${i * 150}ms` }}>
              <div className="w-full md:w-1/2 relative group">
                <div className="aspect-[4/5] relative overflow-hidden shadow-2xl">
                  <SafeImage src={IMAGES.products[i]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
                </div>
                <div className={`absolute -bottom-10 ${i % 2 === 0 ? '-right-10' : '-left-10'} w-2/3 h-2/3 bg-accent/5 -z-10 blur-3xl`} />
              </div>
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                <span className="font-sans text-accent/40 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                  Step 0{i + 1} — The Essence
                </span>
                <h3 className="font-heading text-4xl md:text-6xl font-medium text-accent leading-tight">{p.name}</h3>
                <p className="text-accent/60 mt-6 text-lg leading-relaxed font-light">{p.description}</p>
                <div className="mt-10 flex flex-col gap-6">
                  <span className="text-4xl font-heading text-accent">{p.price}</span>
                  <a href="#contact" className={`bg-accent text-primary px-12 py-4 text-xs font-bold uppercase tracking-widest w-fit ${i % 2 !== 0 ? 'md:ml-auto' : ''} hover:brightness-125 transition-all`}>
                    Order Scent
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY - Bonus Masonry Variant V2 */}
      <section ref={galleryReveal.ref} className="py-32 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="font-heading text-5xl md:text-6xl font-medium text-accent">Visual Serenity</h2>
            <p className="text-accent/50 text-xl font-light max-w-xs">A glimpse into the HTB lifestyle and wellness ritual.</p>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {IMAGES.gallery.map((src, i) => (
              <div key={i} className={`break-inside-avoid relative overflow-hidden transition-all duration-700 ease-out ${galleryReveal.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <SafeImage src={src} alt={`Serenity ${i + 1}`} width={600} height={800} className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES - F-NUMBERED Variant V5 */}
      <section ref={featuresReveal.ref} className="py-32 px-6 bg-accent text-primary overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20">
            <h2 className={`font-heading text-5xl md:text-7xl font-medium transition-all duration-1000 ${featuresReveal.isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>Why Choose HTB</h2>
            <p className="text-primary/60 mt-4 text-lg font-light">The art of wellness in every breath.</p>
          </div>
          <div className="divide-y divide-primary/10">
            {features.map((f, i) => (
              <div key={i} className={`py-12 flex flex-col md:flex-row items-start gap-12 transition-all duration-700 ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <span className="font-heading italic text-5xl text-secondary/30 shrink-0 w-24">0{i + 1}</span>
                <div className="flex-1 pt-2">
                  <h3 className="font-heading text-3xl font-medium mb-4">{f.title}</h3>
                  <p className="text-primary/50 text-lg leading-relaxed font-light max-w-2xl">{f.description}</p>
                </div>
                <div className="w-16 h-16 border border-primary/20 rounded-full flex items-center justify-center text-secondary shrink-0">
                  <f.icon size={28} strokeWidth={1.5} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - T-MASONRY Variant V7 */}
      <section ref={testimonialsReveal.ref} className="py-32 px-6 bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-5xl md:text-6xl font-medium text-accent text-center mb-24">Voices of Peace</h2>
          <div className="columns-1 md:columns-2 gap-8 space-y-8">
            {testimonials.map((t, i) => (
              <div key={i} className={`break-inside-avoid bg-primary p-12 shadow-sm border border-accent/5 relative overflow-hidden transition-all duration-1000 ${testimonialsReveal.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`} style={{ transitionDelay: `${i * 200}ms` }}>
                <Wind className="absolute -top-4 -right-4 text-accent/5" size={120} />
                <p className="text-accent/80 text-2xl font-heading leading-relaxed relative z-10 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-4 mt-10 relative z-10">
                  <div className="w-12 h-12 bg-secondary text-accent flex items-center justify-center font-heading text-xl font-bold rounded-full">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-sans font-bold text-accent tracking-widest text-sm uppercase">{t.name}</p>
                    <p className="text-accent/40 text-xs font-semibold uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT - C2 Diagonal Split */}
      <section id="contact" ref={contactReveal.ref} className="relative overflow-hidden min-h-[800px] flex items-center">
        <div className="absolute inset-0 bg-accent" />
        <div className="absolute inset-0 bg-primary [clip-path:polygon(0_0,65%_0,45%_100%,0_100%)] hidden md:block" />
        <div className="absolute inset-0 bg-primary md:hidden opacity-95" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-24 items-center">
          <div className={`transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="font-heading text-6xl md:text-8xl font-medium text-accent leading-none mb-10">Visit Our <br /><span className="italic">Sanctuary</span></h2>
            <p className="text-accent/60 text-xl font-light mb-12 max-w-md">Our Wuse studio is open for private ritual consultations and scent testing. Come find your peace.</p>
            <div className="space-y-6">
              <div className="flex items-start gap-4 text-accent/80">
                <MapPin className="mt-1 text-secondary" size={20} />
                <div>
                  <p className="font-bold tracking-widest text-xs uppercase">Location</p>
                  <p className="text-lg font-heading">{brand.name}, Wuse, Abuja</p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-accent/80">
                <Instagram className="mt-1 text-secondary" size={20} />
                <div>
                  <p className="font-bold tracking-widest text-xs uppercase">Instagram</p>
                  <p className="text-lg font-heading">@htbscent_n_burnings</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`w-full max-w-md ml-auto transition-all duration-1000 delay-300 ${contactReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-accent py-24 px-6 text-primary border-t border-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <div className="text-3xl font-heading font-bold mb-8 flex items-center gap-2">
                 <div className="w-12 h-12 border border-primary/20 flex items-center justify-center font-heading italic text-2xl">HTB</div>
                 HTB SCENT
              </div>
              <p className="text-primary/50 max-w-sm leading-relaxed font-light italic text-lg mb-8">
                &ldquo;Elevate your essence, ignite your soul.&rdquo;
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 border border-primary/10 flex items-center justify-center rounded-full hover:border-secondary transition-colors cursor-pointer">
                  <Instagram size={18} />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-[0.3em] mb-8 text-secondary">Discover</h4>
              <ul className="space-y-4 text-primary/60 text-sm font-medium tracking-wide">
                <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-primary transition-colors">Our Story</a></li>
                <li><a href="#products" className="hover:text-primary transition-colors">The Ritual</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-[0.3em] mb-8 text-secondary">Services</h4>
              <ul className="space-y-4 text-primary/60 text-sm font-medium tracking-wide">
                <li>Wholesale Inquiries</li>
                <li>Ritual Consultations</li>
                <li>Custom Blending</li>
                <li className="pt-4 text-secondary/80 italic">Sharp delivery across the FCT.</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-xs uppercase tracking-[0.2em] font-bold text-primary/30">
            <p>© {new Date().getFullYear()} HTB Scent & Burnings. All rights reserved.</p>
            <div className="flex gap-8">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="bg-primary p-12 text-center animate-scaleIn shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-secondary/5 group-hover:bg-secondary/10 transition-colors" />
        <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mb-8 mx-auto border border-secondary/40 relative z-10">
          <CheckCheck size={32} className="text-accent" />
        </div>
        <h3 className="font-heading text-4xl font-medium text-accent mb-4 relative z-10 italic">Sorted</h3>
        <p className="text-accent/60 max-w-xs mx-auto leading-relaxed relative z-10 font-light">Your inquiry has reached our sanctuary. We will respond with peace and clarity shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-primary p-10 shadow-2xl border border-accent/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-3xl" />
      <div className="relative z-10">
        <h3 className="font-heading text-3xl font-medium text-accent mb-8">Send an Inquiry</h3>
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
            required
            className="w-full bg-accent/5 border-b border-accent/10 py-4 text-accent placeholder-accent/40 text-sm outline-none transition-all focus:border-accent"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
            required
            className="w-full bg-accent/5 border-b border-accent/10 py-4 text-accent placeholder-accent/40 text-sm outline-none transition-all focus:border-accent"
          />
          <textarea
            rows={4}
            placeholder="Tell us about your space or ritual needs..."
            value={form.message}
            onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
            required
            className="w-full bg-accent/5 border-b border-accent/10 py-4 text-accent placeholder-accent/40 text-sm outline-none resize-none transition-all focus:border-accent"
          />
        </div>
        <button type="submit" disabled={loading}
          className="w-full mt-10 bg-accent text-primary py-5 font-bold text-xs uppercase tracking-widest hover:brightness-125 transition-all flex justify-center items-center gap-3">
          {loading ? <Loader2 className="animate-spin" size={18} /> : "Initiate Contact"}
        </button>
      </div>
    </form>
  );
}