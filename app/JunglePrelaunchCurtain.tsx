"use client";

import { useEffect, useRef } from "react";

const backgroundSelector =
  "#contenu-principal, .conversion-dock, .skip-link";

export default function JunglePrelaunchCurtain() {
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollY = window.scrollY;
    const regions = Array.from(
      document.querySelectorAll<HTMLElement>(backgroundSelector),
    );
    const regionState = regions.map((region) => ({
      region,
      inert: region.inert,
      ariaHidden: region.getAttribute("aria-hidden"),
    }));
    const bodyState = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };

    regions.forEach((region) => {
      region.inert = true;
      region.setAttribute("aria-hidden", "true");
    });
    document.body.classList.add("jungle-prelaunch-curtain-open");
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      curtainRef.current?.focus({ preventScroll: true });
    });
    const keepFocusOnCurtain = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      event.preventDefault();
      curtainRef.current?.focus({ preventScroll: true });
    };

    document.addEventListener("keydown", keepFocusOnCurtain, true);
    return () => {
      document.removeEventListener("keydown", keepFocusOnCurtain, true);
      window.cancelAnimationFrame(focusFrame);
      regionState.forEach(({ region, inert, ariaHidden }) => {
        region.inert = inert;
        if (ariaHidden === null) region.removeAttribute("aria-hidden");
        else region.setAttribute("aria-hidden", ariaHidden);
      });
      document.body.classList.remove("jungle-prelaunch-curtain-open");
      document.body.style.position = bodyState.position;
      document.body.style.top = bodyState.top;
      document.body.style.width = bodyState.width;
      document.body.style.overflow = bodyState.overflow;
      window.scrollTo({ top: scrollY, behavior: "instant" });
    };
  }, []);

  return (
    <div
      className="jungle-prelaunch-curtain"
      role="dialog"
      aria-modal="true"
      aria-labelledby="jungle-prelaunch-title"
      aria-describedby="jungle-prelaunch-signature"
      tabIndex={-1}
      ref={curtainRef}
    >
      <div className="jungle-prelaunch-curtain-surface" aria-hidden="true" />
      <div className="jungle-prelaunch-curtain-content">
        <span className="jungle-prelaunch-curtain-rule" aria-hidden="true" />
        <p id="jungle-prelaunch-title" className="jungle-prelaunch-curtain-title">
          <span>Quelque chose</span>
          <em>se prépare.</em>
        </p>
        <p id="jungle-prelaunch-signature" className="jungle-prelaunch-curtain-signature">
          TIBALDO JUNGLE <span aria-hidden="true">·</span> LILLE
        </p>
        <span className="jungle-prelaunch-curtain-rule is-lower" aria-hidden="true" />
      </div>
    </div>
  );
}
