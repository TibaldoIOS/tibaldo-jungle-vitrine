"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { shopUrl } from "@/lib/environment";

const primaryLinks = [
  ["Plantes", "/plantes"],
  ["Boutique", shopUrl()],
  ["SOS Plantes", "/sos-plantes"],
  ["Conseils", "/conseils"],
] as const;

const secondaryLinks = [
  ["Substrats", "/substrats"],
  ["Pots & cache-pots", "/pots-cache-pots-lille"],
  ["Bar à rempotage", "/rempotage"],
  ["Fleurs sur commande", "/fleurs"],
  ["Services", "/services"],
  ["Événements", "/evenements"],
] as const;

export default function MobileJungleMenu() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const body = document.body;
    const opener = openerRef.current;
    const backgroundRegions = Array.from(document.querySelectorAll<HTMLElement>("main, footer"));
    const backgroundState = backgroundRegions.map((region) => ({
      region,
      inert: region.inert,
      ariaHidden: region.getAttribute("aria-hidden"),
    }));
    backgroundRegions.forEach((region) => {
      region.inert = true;
      region.setAttribute("aria-hidden", "true");
    });
    body.classList.add("jungle-menu-open");
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.cancelAnimationFrame(focusFrame);
      body.classList.remove("jungle-menu-open");
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      backgroundState.forEach(({ region, inert, ariaHidden }) => {
        region.inert = inert;
        if (ariaHidden === null) region.removeAttribute("aria-hidden");
        else region.setAttribute("aria-hidden", ariaHidden);
      });
      window.scrollTo(0, scrollY);
      opener?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);
  const MenuLink = ({ href, children }: { href: string; children: React.ReactNode }) =>
    href.startsWith("http") ? <a href={href} onClick={close}>{children}</a> : <Link href={href} onClick={close}>{children}</Link>;

  return (
    <div className="mobile-jungle-menu">
      <button ref={openerRef} className="mobile-menu-trigger" type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="jungle-mobile-menu">
        <span className="menu-glyph" aria-hidden="true"><i /><i /></span>
        <b>Menu</b>
      </button>
      {open && createPortal(
        <div id="jungle-mobile-menu" className="mobile-menu-overlay" role="dialog" aria-modal="true" aria-label="Navigation principale" ref={dialogRef}>
          <div className="mobile-menu-topbar">
            <Link className="mobile-menu-identity" href="/" onClick={close}>
              <strong>STUDIO VÉGÉTAL</strong>
              <span>TIBALDO Jungle · Lille</span>
            </Link>
            <button ref={closeRef} className="mobile-menu-close" type="button" onClick={close} aria-label="Fermer le menu"><span aria-hidden="true">×</span></button>
          </div>
          <div className="mobile-menu-scroll">
            <nav className="mobile-menu-primary" aria-label="Navigation principale mobile">
              {primaryLinks.map(([label, href]) => <MenuLink href={href} key={label}>{label}<span aria-hidden="true">↗</span></MenuLink>)}
            </nav>
            <nav className="mobile-menu-secondary" aria-label="Services du Studio">
              {secondaryLinks.map(([label, href]) => <MenuLink href={href} key={label}>{label}</MenuLink>)}
            </nav>
            <nav className="mobile-menu-utility" aria-label="Contact et réseaux">
              <Link href="/contact" onClick={close}>Nous trouver</Link>
              <Link href="/contact" onClick={close}>Contact</Link>
              <a href="https://www.instagram.com/tibaldojungle" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://www.facebook.com/tibaldojungle" target="_blank" rel="noreferrer">Facebook</a>
            </nav>
          </div>
          <p className="mobile-menu-note">Plantes · conseils · services botaniques à Lille</p>
        </div>,
        document.body,
      )}
    </div>
  );
}
