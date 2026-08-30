"use client";

import { useEffect, useRef, useState } from "react";

type SafeLinkMaskLayerProps = {
  shopOrigin: string;
};

const focusableSelector =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function shopAnchorFromTarget(target: EventTarget | null, shopOrigin: string) {
  if (!(target instanceof Element)) return null;
  const anchor = target.closest<HTMLAnchorElement>("a[href]");
  if (!anchor) return null;

  try {
    return new URL(anchor.href, window.location.href).origin === shopOrigin
      ? anchor
      : null;
  } catch {
    return null;
  }
}

export default function SafeLinkMaskLayer({ shopOrigin }: SafeLinkMaskLayerProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const describeShopLinks = () => {
      document.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((anchor) => {
        if (!shopAnchorFromTarget(anchor, shopOrigin)) return;
        anchor.dataset.safeLinkMask = "shop";
        anchor.setAttribute("aria-haspopup", "dialog");
      });
    };

    const openMask = (anchor: HTMLAnchorElement) => {
      triggerRef.current = anchor;
      setOpen(true);
    };

    const onClick = (event: MouseEvent) => {
      const anchor = shopAnchorFromTarget(event.target, shopOrigin);
      if (!anchor) return;
      event.preventDefault();
      openMask(anchor);
    };

    const onAuxClick = (event: MouseEvent) => {
      if (event.button !== 1) return;
      const anchor = shopAnchorFromTarget(event.target, shopOrigin);
      if (!anchor) return;
      event.preventDefault();
      openMask(anchor);
    };

    describeShopLinks();
    const linkObserver = new MutationObserver(describeShopLinks);
    linkObserver.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onAuxClick, true);
    return () => {
      linkObserver.disconnect();
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onAuxClick, true);
    };
  }, [shopOrigin]);

  useEffect(() => {
    if (!open) return;

    const backgroundRegions = Array.from(
      document.querySelectorAll<HTMLElement>(
        "#contenu-principal, .conversion-dock, .skip-link",
      ),
    );
    const backgroundState = backgroundRegions.map((region) => ({
      region,
      inert: region.inert,
      ariaHidden: region.getAttribute("aria-hidden"),
    }));

    backgroundRegions.forEach((region) => {
      region.inert = true;
      region.setAttribute("aria-hidden", "true");
    });

    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
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
      backgroundState.forEach(({ region, inert, ariaHidden }) => {
        region.inert = inert;
        if (ariaHidden === null) region.removeAttribute("aria-hidden");
        else region.setAttribute("aria-hidden", ariaHidden);
      });
      const trigger = triggerRef.current;
      if (trigger?.isConnected) trigger.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="safe-link-mask"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <div
        className="safe-link-mask-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="safe-link-mask-title"
        aria-describedby="safe-link-mask-copy"
        ref={dialogRef}
      >
        <p className="safe-link-mask-eyebrow">Boutique en ligne</p>
        <h2 id="safe-link-mask-title">Le Shop ouvre bientôt.</h2>
        <p id="safe-link-mask-copy">
          La boutique en ligne est encore en préparation. Jungle reste ouverte
          pour découvrir les plantes, les conseils et les services du Studio.
        </p>
        <button ref={closeRef} type="button" onClick={() => setOpen(false)}>
          Continuer sur Jungle
        </button>
      </div>
    </div>
  );
}
