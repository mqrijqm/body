'use client';

import { useEffect, useState } from 'react';
import { bookingHref, siteContent } from '@/data/site-content';
import './site.css';

function Logo({ src = '/bhs/wordmark-light.svg' }: { src?: string }) { return <img className="site-logo" src={src} alt="Body & Soul" />; }

function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showFloatingCta, setShowFloatingCta] = useState(false);

  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 24); setShowFloatingCta(window.scrollY > window.innerHeight); };
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey); };
  }, []);

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
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header className={`navbar${scrolled || menuOpen ? ' navbar--solid' : ''}`}>
        <nav className="navbar__links navbar__links--left" aria-label="Glavna navigacija">{siteContent.navigation.slice(0, 2).map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
        <a className="navbar__brand navbar__brand--center" href="#pocetna" aria-label="Body & Soul Pilates"><Logo src="/bhs/wordmark-light.svg" /></a>
        <nav className="navbar__links navbar__links--right" aria-label="Glavna navigacija">{siteContent.navigation.slice(2).map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
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
            <img className="hero__mark" src="/bhs/wordmark-light.svg" alt="Body & Soul" />
            <p className="hero__triad"><span>POVEŽI</span><i aria-hidden="true">·</i><span>OBLIKUJ</span><i aria-hidden="true">·</i><em>OJAČAJ</em></p>
            <a className="hero__cta" href="#rezervacije">Rezerviši termin <Arrow /></a>
          </div>
        </section>

        <section className="statement section" data-reveal><p className="eyebrow">Body &amp; Soul</p><h2>Precizan pokret i prostor u kojem se jednako njeguju <em>snaga tijela</em> i mir uma.</h2><p>Moderan reformer trening u svijetlom, pažljivo oblikovanom studiju — sa jasnim vođenjem i pristupom koji poštuje tvoj tempo.</p></section>

        <section className="section manifest" aria-labelledby="manifest-title">
          <p className="manifest__triad"><span>Ojačaj</span><i aria-hidden="true">·</i><span>Izduži</span><i aria-hidden="true">·</i><em>Transformiši</em></p>
          <h2 id="manifest-title" className="manifest__claim">Body &amp; Soul gradi trajne promjene za tvoje tijelo i um</h2>
          <a className="button button--outline" href="#treninzi">Istraži</a>
        </section>

        <section className="section offer" aria-labelledby="offer-title">
          <div className="offer__copy"><h2 id="offer-title">Reformer studio koji <b>OBLIKUJE</b> tijelo i <em>smiruje</em> um</h2><a className="button" href={bookingHref} target="_blank" rel="noreferrer">Rezerviši termin</a></div>
          <ul className="offer__list"><li><span aria-hidden="true">+</span>Grupni reformer treninzi</li><li><span aria-hidden="true">+</span>Individualni termini</li><li><span aria-hidden="true">+</span>Male grupe i jasno vođenje</li><li><span aria-hidden="true">+</span>Paketi od 6, 8 i 12 termina</li><li><span aria-hidden="true">+</span>Rezervacija kroz aplikaciju</li></ul>
        </section>

        <section className="studio section" id="studio">
          <div className="studio__copy" data-reveal><p className="eyebrow">O studiju</p><h2>Prostor za fokusiran pokret i <em>dosljednu praksu.</em></h2><p>Body &amp; Soul je pažljivo uređen studio u kojem se forma, kontrola i individualna pažnja stavljaju ispred brzine.</p><p>Pristup je topao i jasan, bilo da prvi put upoznaješ reformer ili želiš da svojoj rutini vratiš kontinuitet.</p><a className="text-link" href="#iskustvo">Doživi prostor <Arrow /></a></div>
        </section>

        <section className="trainings section" id="treninzi">
          <div className="section-heading" data-reveal><p className="eyebrow">Treninzi</p><h2>Pokret prilagođen <em>tvom ritmu.</em></h2></div>
          <div className="trainings__list">{siteContent.trainings.map((training) => <article className="training" key={training.number} data-reveal><span>{training.number}</span><h3>{training.title}</h3><div><p>{training.description}</p><small>{training.bestFor}</small></div><a href={bookingHref} target="_blank" rel="noreferrer" aria-label={`Rezerviši ${training.title}`}><Arrow /></a></article>)}</div>
        </section>

        <section className="pillars section" aria-labelledby="pillars-title">
          <div className="section-heading" data-reveal><p className="eyebrow">Cjelovit pristup</p><h2 id="pillars-title">Body. Mind. <em>Soul.</em></h2></div>
          <div className="pillars__grid"><article data-reveal><span>01</span><h3>BODY</h3><p>Snaga, kontrola i mobilnost kroz precizan pokret.</p></article><article data-reveal><span>02</span><h3>MIND</h3><p>Fokus, prisutnost i svjesno kretanje tokom treninga.</p></article><article data-reveal><span>03</span><h3>SOUL</h3><p>Vrijeme za sebe i osjećaj ravnoteže u mirnom prostoru.</p></article></div>
        </section>

        <section className="experience section" id="iskustvo">
          <div className="experience__copy" data-reveal><p className="eyebrow">Iskustvo studija</p><h2>Svjetlo, prirodni materijali i prostor koji ostavlja mjesta za <em>fokus.</em></h2></div>
          <ul className="experience__notes">
            <li data-reveal><span>Svjetlo</span><p>Velike površine dnevnog svjetla i tihe, tople nijanse.</p></li>
            <li data-reveal><span>Materijali</span><p>Drvo, tekstil i zelenilo umjesto hladnog studija.</p></li>
            <li data-reveal><span>Tempo</span><p>Male grupe, dovoljno prostora i vremena za svaki pokret.</p></li>
          </ul>
        </section>

        <section className="atmosphere" aria-label="Atmosfera Body &amp; Soul studija"><p>Prostor oblikovan za miran početak i snažan završetak.</p></section>

        <section className="booking section" id="rezervacije">
          <div className="booking__copy" data-reveal><p className="eyebrow">Rezervacije</p><h2>Tvoj termin,<br /><em>u nekoliko koraka.</em></h2><ol>{siteContent.bookingSteps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol><p className="booking__note">Aplikacija je dostupna na Google Play i App Store platformama. Pristupne podatke dobijaš putem e-maila nakon uplate paketa.</p><a className="button" href={bookingHref} target="_blank" rel="noreferrer">Rezerviši svoj termin <Arrow /></a></div>
        </section>

        <section className="rules section"><div className="section-heading" data-reveal><p className="eyebrow">Prije rezervacije</p><h2>Jednostavna pravila,<br /><em>više slobode.</em></h2></div><ul>{siteContent.bookingRules.map((rule, index) => <li key={rule} data-reveal><span>0{index + 1}</span>{rule}</li>)}</ul></section>

        <section className="faq section" id="faq"><div className="faq__intro"><div className="section-heading" data-reveal><p className="eyebrow">Dobro je znati</p><h2>Česta <em>pitanja.</em></h2></div></div><div className="faq__list">{siteContent.faq.map((item) => <details key={item.question} data-reveal><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section>

        <section className="final-cta section" id="kontakt">
          <div className="final-cta__copy" data-reveal><p className="eyebrow">Body &amp; Soul Pilates</p><h2>Vrijeme koje odvajaš za sebe mijenja <em>više od tijela.</em></h2><a className="button" href={bookingHref} target="_blank" rel="noreferrer">Rezerviši termin <Arrow /></a></div>
        </section>
      </main>

      <footer className="footer"><div className="footer__top"><img src="/bhs/wordmark-light.svg" alt="Body & Soul" /><nav aria-label="Navigacija u podnožju">{siteContent.navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav><div><p>Prati studio</p><a href={siteContent.instagramUrl} target="_blank" rel="noreferrer">{siteContent.instagramHandle} <Arrow /></a></div></div><div className="footer__bottom"><p>© {new Date().getFullYear()} BODY &amp; SOUL PILATES. Sva prava zadržana.</p><a href="#pocetna">Nazad na vrh ↑</a></div></footer>

      <a className={`floating-cta${showFloatingCta ? ' is-visible' : ''}`} href="#rezervacije">Rezerviši termin <Arrow /></a>
    </>
  );
}
