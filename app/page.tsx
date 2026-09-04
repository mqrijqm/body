'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { bookingHref, siteContent } from '@/data/site-content';
import './site.css';

const gallery = [
  { src: '/bhs/studio-wide.webp', alt: 'Svijetla Body & Soul sala sa reformerima', className: 'gallery__wide' },
  { src: '/bhs/studio-detail.webp', alt: 'Detalj opreme i prirodnih materijala u studiju', className: '' },
  { src: '/bhs/studio-reformers.webp', alt: 'Uredno raspoređeni reformeri u Body & Soul studiju', className: '' },
  { src: '/bhs/studio-plant.webp', alt: 'Atmosfera studija kroz zelenilo u prvom planu', className: 'gallery__panorama' },
];

function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); setLightbox(null); }
      if (lightbox !== null && event.key === 'ArrowRight') setLightbox((lightbox + 1) % gallery.length);
      if (lightbox !== null && event.key === 'ArrowLeft') setLightbox((lightbox - 1 + gallery.length) % gallery.length);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey); };
  }, [lightbox]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.14 },
    );
    document.querySelectorAll('[data-reveal]').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || lightbox !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, lightbox]);

  return (
    <>
      <header className={`navbar${scrolled || menuOpen ? ' navbar--solid' : ''}`}>
        <a className="navbar__brand" href="#pocetna" aria-label="Body & Soul Pilates — početna"><img src="/bhs/wordmark-light.svg" alt="Body & Soul" /><small>PILATES</small></a>
        <nav className="navbar__links" aria-label="Glavna navigacija">{siteContent.navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
        <a className="button button--small navbar__booking" href={bookingHref} target="_blank" rel="noreferrer">Rezerviši termin <Arrow /></a>
        <button className="menu-button" type="button" aria-label={menuOpen ? 'Zatvori meni' : 'Otvori meni'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      </header>

      <div id="mobile-menu" className={`mobile-menu${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobilna navigacija">{siteContent.navigation.map((item, index) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}><small>0{index + 1}</small>{item.label}</a>)}</nav>
        <a className="button" href={bookingHref} target="_blank" rel="noreferrer">Rezerviši termin <Arrow /></a>
      </div>

      <main>
        <section className="hero" id="pocetna">
          <div className="hero__copy">
            <p className="eyebrow">Reformer pilates studio</p>
            <h1>Snaga u tijelu.<br /><em>Mir u umu.</em></h1>
            <p className="hero__lead">Prostor posvećen svjesnom pokretu, pravilnoj formi i osjećaju ravnoteže koji ostaje i nakon treninga.</p>
            <div className="hero__actions"><a className="button" href={bookingHref} target="_blank" rel="noreferrer">Rezerviši termin <Arrow /></a><a className="text-link" href="#studio">Upoznaj studio <span aria-hidden="true">↓</span></a></div>
            <p className="hero__signature">Elevate your mind. Sculpt your body.</p>
          </div>
          <div className="hero__visual"><Image src="/bhs/studio-hero.webp" alt="Svijetla Body & Soul reformer sala" fill priority sizes="(min-width: 900px) 58vw, 100vw" /><img className="hero__symbol" src="/bhs/symbol-light.svg" alt="" /></div>
        </section>

        <section className="statement section" data-reveal><p className="eyebrow">Body &amp; Soul</p><h2>Precizan pokret i prostor u kojem se jednako njeguju <em>snaga tijela</em> i mir uma.</h2><p>Moderan reformer trening u svijetlom, pažljivo oblikovanom studiju — sa jasnim vođenjem i pristupom koji poštuje tvoj tempo.</p></section>

        <section className="studio section" id="studio">
          <div className="studio__image image-reveal" data-reveal><Image src="/bhs/reception.webp" alt="Recepcija Body & Soul Pilates studija" fill sizes="(min-width: 800px) 48vw, 100vw" /></div>
          <div className="studio__copy" data-reveal><p className="eyebrow">O studiju</p><h2>Prostor za fokusiran pokret i <em>dosljednu praksu.</em></h2><p>Body &amp; Soul je pažljivo uređen studio u kojem se forma, kontrola i individualna pažnja stavljaju ispred brzine.</p><p>Pristup je topao i jasan, bilo da prvi put upoznaješ reformer ili želiš da svojoj rutini vratiš kontinuitet.</p><a className="text-link" href="#iskustvo">Doživi prostor <Arrow /></a></div>
        </section>

        <section className="trainings section" id="treninzi">
          <div className="section-heading" data-reveal><p className="eyebrow">Treninzi</p><h2>Pokret prilagođen <em>tvom ritmu.</em></h2></div>
          <div className="trainings__list">{siteContent.trainings.map((training) => <article className="training" key={training.number} data-reveal><span>{training.number}</span><h3>{training.title}</h3><div><p>{training.description}</p><small>{training.bestFor}</small></div><a href={bookingHref} target="_blank" rel="noreferrer" aria-label={`Rezerviši ${training.title}`}><Arrow /></a></article>)}</div>
        </section>

        <section className="pillars section" aria-labelledby="pillars-title">
          <img className="pillars__symbol" src="/bhs/symbol-dark.svg" alt="" />
          <div className="section-heading" data-reveal><p className="eyebrow">Cjelovit pristup</p><h2 id="pillars-title">Body. Mind. <em>Soul.</em></h2></div>
          <div className="pillars__grid"><article data-reveal><span>01</span><h3>BODY</h3><p>Snaga, kontrola i mobilnost kroz precizan pokret.</p></article><article data-reveal><span>02</span><h3>MIND</h3><p>Fokus, prisutnost i svjesno kretanje tokom treninga.</p></article><article data-reveal><span>03</span><h3>SOUL</h3><p>Vrijeme za sebe i osjećaj ravnoteže u mirnom prostoru.</p></article></div>
        </section>

        <section className="experience section" id="iskustvo">
          <div className="experience__copy" data-reveal><p className="eyebrow">Iskustvo studija</p><h2>Svjetlo, prirodni materijali i prostor koji ostavlja mjesta za <em>fokus.</em></h2></div>
          <div className="experience__images"><div className="experience__main" data-reveal><Image src="/bhs/studio-reformers.webp" alt="Body & Soul studio sa reformerima i prirodnim drvetom" fill sizes="(min-width: 800px) 68vw, 100vw" /></div><div className="experience__detail" data-reveal><Image src="/bhs/studio-detail.webp" alt="Detalj opreme u Body & Soul studiju" fill sizes="(min-width: 800px) 28vw, 70vw" /></div></div>
        </section>

        <section className="atmosphere" aria-label="Atmosfera Body & Soul studija"><Image src="/bhs/studio-plant.webp" alt="Mirna atmosfera Body & Soul studija kroz zelenilo" fill sizes="100vw" /><p>Prostor oblikovan za miran početak i snažan završetak.</p></section>

        <section className="booking section" id="rezervacije">
          <div className="booking__visual" data-reveal><Image className="booking__photo" src="/bhs/booking-phone.webp" alt="Body & Soul aplikacija za rezervaciju termina" fill sizes="(min-width: 800px) 42vw, 100vw" /><Image className="booking__screen" src="/bhs/booking-app.webp" alt="Prikaz Body & Soul aplikacije na telefonu" width={260} height={375} sizes="(min-width: 800px) 18vw, 42vw" /></div>
          <div className="booking__copy" data-reveal><p className="eyebrow">Rezervacije</p><h2>Tvoj termin,<br /><em>u nekoliko koraka.</em></h2><ol>{siteContent.bookingSteps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol><p className="booking__note">Aplikacija je dostupna na Google Play i App Store platformama. Pristupne podatke dobijaš putem e-maila nakon uplate paketa.</p><a className="button" href={bookingHref} target="_blank" rel="noreferrer">Rezerviši svoj termin <Arrow /></a></div>
        </section>

        <section className="rules section"><div className="section-heading" data-reveal><p className="eyebrow">Prije rezervacije</p><h2>Jednostavna pravila,<br /><em>više slobode.</em></h2></div><ul>{siteContent.bookingRules.map((rule, index) => <li key={rule} data-reveal><span>0{index + 1}</span>{rule}</li>)}</ul></section>

        <section className="gallery section" id="galerija">
          <div className="section-heading" data-reveal><p className="eyebrow">Galerija</p><h2>Pogled u <em>studio.</em></h2></div>
          <div className="gallery__grid">{gallery.map((image, index) => <button className={image.className} type="button" key={image.src} onClick={() => setLightbox(index)} aria-label={`Otvori sliku: ${image.alt}`} data-reveal><Image src={image.src} alt={image.alt} fill sizes={index === 0 || index === 3 ? '100vw' : '(min-width: 800px) 48vw, 100vw'} /></button>)}</div>
        </section>

        <section className="faq section" id="faq"><div className="section-heading" data-reveal><p className="eyebrow">Dobro je znati</p><h2>Česta <em>pitanja.</em></h2></div><div className="faq__list">{siteContent.faq.map((item) => <details key={item.question} data-reveal><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section>

        <section className="final-cta section" id="kontakt">
          <div className="final-cta__copy" data-reveal><img src="/bhs/symbol-dark.svg" alt="" /><p className="eyebrow">Body &amp; Soul Pilates</p><h2>Vrijeme koje odvajaš za sebe mijenja <em>više od tijela.</em></h2><a className="button" href={bookingHref} target="_blank" rel="noreferrer">Rezerviši termin <Arrow /></a></div>
          <div className="final-cta__image" data-reveal><Image src="/bhs/instructor.webp" alt="Instruktorica u Body & Soul Pilates studiju" fill sizes="(min-width: 800px) 44vw, 100vw" /></div>
        </section>
      </main>

      <footer className="footer"><div className="footer__top"><img src="/bhs/wordmark-light.svg" alt="Body & Soul" /><nav aria-label="Navigacija u podnožju">{siteContent.navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav><div><p>Prati studio</p><a href={siteContent.instagramUrl} target="_blank" rel="noreferrer">{siteContent.instagramHandle} <Arrow /></a></div></div><div className="footer__bottom"><p>© {new Date().getFullYear()} BODY &amp; SOUL PILATES. Sva prava zadržana.</p><a href="#pocetna">Nazad na vrh ↑</a></div></footer>

      {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Pregled fotografije" onClick={() => setLightbox(null)}><button type="button" aria-label="Zatvori pregled" onClick={() => setLightbox(null)}>×</button><div className="lightbox__image" onClick={(event) => event.stopPropagation()}><Image src={gallery[lightbox].src} alt={gallery[lightbox].alt} fill sizes="92vw" /></div></div>}
    </>
  );
}
