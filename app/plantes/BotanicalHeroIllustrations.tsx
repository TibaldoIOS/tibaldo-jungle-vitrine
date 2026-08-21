import type { ReactNode } from "react";

function BotanicalSvg({ children }: { children: ReactNode }) {
  return <svg className="botanical-genus-svg" viewBox="0 0 620 560" aria-hidden="true" focusable="false">
    <g>{children}</g>
  </svg>;
}

const broadLeafVeins = [-430, -391, -350, -311, -278];

function StrelitziaLeaf({ transform }: { transform: string }) {
  return <g transform={transform}>
    <path d="M0 5C-7-78-5-171 1-252" />
    <path d="M1-252C-64-274-89-361-18-474C44-438 69-346 31-282C22-267 10-257 1-252Z" />
    <path d="M1-252C4-326 0-401-12-470" />
    {broadLeafVeins.map((y, index) => {
      const progress = (y + 474) / 222;
      const spread = 16 + Math.sin(progress * Math.PI) * 51;
      return <g key={y}>
        <path className="botanical-vein-fine" d={`M${-10 + progress * 11} ${y}C${-22 - spread * .18} ${y + 8 + index} ${-spread * .7} ${y + 17} ${-spread} ${y + 27}`} />
        <path className="botanical-vein-fine" d={`M${-10 + progress * 11} ${y}C${14 + spread * .18} ${y + 9} ${spread * .66} ${y + 18 + index} ${spread * .82} ${y + 29}`} />
      </g>;
    })}
  </g>;
}

export function StrelitziaBotanicalIllustration() {
  return <BotanicalSvg>
    <g className="botanical-back">
      <StrelitziaLeaf transform="translate(286 562) rotate(-45) scale(.74 .78)" />
      <StrelitziaLeaf transform="translate(323 561) rotate(-18) scale(.88 1.02)" />
      <StrelitziaLeaf transform="translate(383 561) rotate(17) scale(.92 1.08)" />
      <StrelitziaLeaf transform="translate(427 562) rotate(43) scale(.76 .82)" />
    </g>
    <StrelitziaLeaf transform="translate(300 561) rotate(-34) scale(.88 .93)" />
    <StrelitziaLeaf transform="translate(337 560) rotate(-8) scale(1.00 1.18)" />
    <StrelitziaLeaf transform="translate(365 560) rotate(5) scale(1.06 1.22)" />
    <StrelitziaLeaf transform="translate(399 561) rotate(25) scale(.96 1.02)" />
    <StrelitziaLeaf transform="translate(435 562) rotate(51) scale(.82 .78)" />
    <g className="strelitzia-flower" transform="translate(310 249) rotate(-8)">
      <path d="M0 310C-3 214 2 115 16 29" />
      <path d="M16 29C45 35 76 30 112 10C93 39 61 54 20 49Z" />
      <path d="M20 29C29 0 43-23 64-43C65-13 55 10 33 31" />
      <path d="M38 24C50-17 69-49 95-70C93-29 78 2 55 28" />
      <path d="M58 18C73-16 91-42 114-57C108-23 95 2 75 23" />
      <path className="botanical-vein-fine" d="M21 38C48 38 76 29 101 15M30 29C41 11 51-8 61-31M49 24C61-4 74-29 91-55" />
    </g>
  </BotanicalSvg>;
}

