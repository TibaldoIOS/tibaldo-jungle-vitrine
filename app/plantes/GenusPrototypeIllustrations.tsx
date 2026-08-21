import type { ReactNode } from "react";

type IllustrationProps = {
  children: ReactNode;
};

function BotanicalSvg({ children }: IllustrationProps) {
  return <svg className="plant-genus-line-art is-detailed" viewBox="0 0 620 560" aria-hidden="true" focusable="false">
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

function StrelitziaIllustration() {
  return <BotanicalSvg>
    <g className="botanical-back botanical-back-rich">
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

const bananaVeins = [-306, -274, -242, -210, -178, -146, -114];

function BananaLeaf({ transform, split = false }: { transform: string; split?: boolean }) {
  return <g transform={transform}>
    <path d="M0 4C-5-28-4-58 0-88" />
    <path d="M0-88C-38-94-62-134-65-188C-69-246-47-302-18-337C-9-346-3-348 0-344C29-316 59-266 66-215C74-156 48-101 0-88Z" />
    <path d="M0-88C4-166 3-256 0-340" />
    {bananaVeins.map((y) => {
      const progress = (y + 344) / 256;
      const spread = 17 + Math.sin(progress * Math.PI) * 37;
      return <g key={y}>
        <path className="botanical-vein-fine" d={`M0 ${y}C${-18} ${y + 9} ${-spread * .7} ${y + 20} ${-spread} ${y + 31}`} />
        <path className="botanical-vein-fine" d={`M0 ${y}C${18} ${y + 9} ${spread * .7} ${y + 20} ${spread} ${y + 31}`} />
      </g>;
    })}
    {split && <path d="M-63-222C-48-210-35-195-19-176M65-204C49-191 36-174 18-153M-50-282C-38-268-27-251-14-231" />}
  </g>;
}

function BananiersIllustration() {
  return <BotanicalSvg>
    <g className="botanical-back">
      <BananaLeaf transform="translate(301 350) rotate(-58) scale(.78 .73)" split />
      <BananaLeaf transform="translate(326 332) rotate(-33) scale(.78 .91)" />
      <BananaLeaf transform="translate(389 337) rotate(38) scale(.78 .88)" />
      <BananaLeaf transform="translate(414 354) rotate(64) scale(.72 .70)" split />
    </g>
    <path d="M277 560C270 487 276 411 304 337C316 326 332 328 342 341C350 416 349 492 337 560Z" />
    <path d="M326 560C319 477 326 395 348 318C361 307 379 309 389 324C402 401 404 481 393 560Z" />
    <path d="M378 560C377 493 384 424 410 354C422 345 438 349 446 362C455 427 455 495 448 560Z" />
    <path className="botanical-vein-fine" d="M280 516C299 528 319 529 339 518M281 463C302 476 324 477 346 466M332 508C352 521 375 521 398 510M335 450C355 463 381 463 401 452M385 510C404 520 427 521 450 511M390 456C409 466 433 467 452 458" />
    <BananaLeaf transform="translate(310 344) rotate(-47) scale(.82 .88)" split />
    <BananaLeaf transform="translate(337 324) rotate(-24) scale(.85 1.03)" />
    <BananaLeaf transform="translate(365 313) rotate(-3) scale(.88 1.14)" />
    <BananaLeaf transform="translate(393 327) rotate(24) scale(.84 1.00)" split />
    <BananaLeaf transform="translate(421 349) rotate(50) scale(.80 .84)" />
    <path d="M367 319C361 271 365 224 378 177C393 224 394 273 381 321Z" />
    <path className="botanical-vein-fine" d="M373 309C375 261 377 219 378 180" />
    <g transform="translate(469 385) rotate(7)">
      <path d="M0 174C4 116 7 60 2 0" />
      <path d="M2 0C26 12 43 31 49 54C25 57 8 39 2 0Z" />
      {[62, 79, 96, 113].map((y, row) => <g key={y}>
        {[-18, 0, 18].map((x) => <path key={x} d={`M${x} ${y}c-9 7-9 19 0 27c9-8 9-20 0-27Z`} transform={`rotate(${x / 2 + row * 2} ${x} ${y})`} />)}
      </g>)}
      <path d="M0 139C-10 151-14 164-12 177M0 139C10 151 14 164 12 177" />
    </g>
  </BotanicalSvg>;
}

const alocasiaVeins = [-276, -226, -176, -126];

function AlocasiaLeaf({ transform }: { transform: string }) {
  return <g transform={transform}>
    <path d="M0 5C-4-28-3-56 0-77" />
    <path d="M0-77C-34-45-92-50-127-91C-166-137-130-240 0-326C130-240 166-137 127-91C92-50 34-45 0-77Z" />
    <path d="M0-77C0-153 0-238 0-323" />
    <path d="M0-78C-32-97-70-98-113-89M0-78C32-97 70-98 113-89" />
    {alocasiaVeins.map((y, index) => {
      const width = 38 + (6 - index) * 11;
      return <g key={y}>
        <path d={`M0 ${y}C${-24} ${y + 9} ${-width * .72} ${y + 23} ${-width} ${y + 42}`} />
        <path d={`M0 ${y}C${24} ${y + 9} ${width * .72} ${y + 23} ${width} ${y + 42}`} />
      </g>;
    })}
  </g>;
}

function AlocasiaIllustration() {
  return <BotanicalSvg>
    <g className="botanical-back">
      <AlocasiaLeaf transform="translate(232 559) rotate(-42) scale(.62 .70)" />
      <AlocasiaLeaf transform="translate(430 559) rotate(34) scale(.64 .72)" />
    </g>
    <AlocasiaLeaf transform="translate(278 559) rotate(-26) scale(.84 .94)" />
    <AlocasiaLeaf transform="translate(345 559) rotate(-3) scale(1.05 1.16)" />
    <AlocasiaLeaf transform="translate(411 559) rotate(20) scale(.87 .98)" />
    <AlocasiaLeaf transform="translate(463 559) rotate(43) scale(.66 .74)" />
  </BotanicalSvg>;
}

const monsteraVeins = [-278, -218, -158, -108];

function MonsteraLeaf({ transform, mature = true }: { transform: string; mature?: boolean }) {
  return <g transform={transform}>
    <path d="M0 7C-5-34-3-67 0-91" />
    <path d="M0-91C-39-48-103-48-140-91C-184-142-146-260 0-342C146-260 184-142 140-91C103-48 39-48 0-91Z" />
    <path d="M0-91V-338" />
    {monsteraVeins.map((y, index) => {
      const width = 38 + (6 - index) * 13;
      return <g key={y}>
        <path d={`M0 ${y}C${-27} ${y + 10} ${-width * .72} ${y + 27} ${-width} ${y + 49}`} />
        <path d={`M0 ${y}C${27} ${y + 10} ${width * .72} ${y + 27} ${width} ${y + 49}`} />
      </g>;
    })}
    {mature && <>
      <path d="M-58-287C-87-280-104-265-115-240M58-287C87-280 104-265 115-240" />
      <path d="M-82-238C-118-228-139-206-151-177M82-238C118-228 139-206 151-177" />
      <path d="M-93-184C-132-170-152-148-160-119M93-184C132-170 152-148 160-119" />
      <path d="M-40-274C-61-264-68-242-58-222C-38-226-27-242-29-263C-32-269-35-272-40-274Z" />
      <path d="M42-247C63-238 71-217 62-197C41-200 29-216 31-237C34-243 37-246 42-247Z" />
      <path d="M-47-190C-68-181-76-160-66-141C-46-144-34-159-36-180C-39-185-42-188-47-190Z" />
      <path d="M48-166C68-157 75-137 65-119C46-122 35-137 37-157C40-162 43-165 48-166Z" />
    </>}
  </g>;
}

function MonsteraIllustration() {
  return <BotanicalSvg>
    <g className="botanical-back botanical-back-rich">
      <path d="M372 560C364 503 339 464 303 426C269 390 258 344 277 301C294 263 327 237 369 219" />
      <path d="M398 560C409 509 437 474 469 440C501 405 506 358 482 316" />
    </g>
    <g className="botanical-back">
      <MonsteraLeaf mature={false} transform="translate(369 219) rotate(8) scale(.42 .47)" />
      <MonsteraLeaf transform="translate(277 301) rotate(-40) scale(.62 .67)" />
    </g>
    <MonsteraLeaf transform="translate(303 426) rotate(-24) scale(.78 .84)" />
    <MonsteraLeaf transform="translate(469 440) rotate(29) scale(.70 .76)" />
    <MonsteraLeaf transform="translate(394 559) rotate(8) scale(.94 1.01)" />
  </BotanicalSvg>;
}

const anthuriumVeins = [-280, -248, -216, -184, -152, -121];

function AnthuriumHeartLeaf({ transform }: { transform: string }) {
  return <g transform={transform}>
    <path d="M0 6C-3-33-2-61 0-82" />
    <path d="M0-82C-34-45-89-49-126-91C-164-135-145-236-68-311C-33-345-11-315 0-277C12-315 34-345 69-311C145-236 164-135 126-91C89-49 34-45 0-82Z" />
    <path d="M0-82V-274" />
    <path d="M0-83C-35-102-72-105-112-96M0-83C35-102 72-105 112-96" />
    {anthuriumVeins.map((y, index) => {
      const width = 34 + (5 - index) * 14;
      return <g key={y}>
        <path d={`M0 ${y}C${-24} ${y + 11} ${-width * .7} ${y + 28} ${-width} ${y + 48}`} />
        <path d={`M0 ${y}C${24} ${y + 11} ${width * .7} ${y + 28} ${width} ${y + 48}`} />
        <path className="botanical-vein-fine" d={`M${-width * .42} ${y + 23}l${-width * .2} 25M${width * .42} ${y + 23}l${width * .2} 25`} />
      </g>;
    })}
  </g>;
}

function AnthuriumLongLeaf({ transform }: { transform: string }) {
  return <g transform={transform}>
    <path d="M0 5C-3-40-1-74 0-96" />
    <path d="M0-96C-55-145-59-259 0-382C59-259 55-145 0-96Z" />
    <path d="M0-99V-378" />
    {[-345, -315, -285, -255, -225, -195, -165, -135].map((y, index) => {
      const width = 17 + Math.sin((index + 1) / 9 * Math.PI) * 31;
      return <g key={y}>
        <path d={`M0 ${y}C${-15} ${y + 8} ${-width * .75} ${y + 17} ${-width} ${y + 30}`} />
        <path d={`M0 ${y}C${15} ${y + 8} ${width * .75} ${y + 17} ${width} ${y + 30}`} />
      </g>;
    })}
  </g>;
}

function AnthuriumIllustration() {
  return <BotanicalSvg>
    <g className="botanical-back">
      <AnthuriumHeartLeaf transform="translate(198 559) rotate(-43) scale(.61)" />
      <AnthuriumLongLeaf transform="translate(330 559) rotate(-9) scale(.79)" />
      <AnthuriumHeartLeaf transform="translate(477 559) rotate(41) scale(.59)" />
    </g>
    <AnthuriumHeartLeaf transform="translate(251 559) rotate(-26) scale(.86)" />
    <AnthuriumLongLeaf transform="translate(337 559) rotate(-1) scale(1.08)" />
    <AnthuriumHeartLeaf transform="translate(426 559) rotate(25) scale(.84)" />
    <g transform="translate(493 420) rotate(19)">
      <path d="M0 136C-2 90 3 46 13 0" />
      <path d="M13 0C38 12 51 36 43 61C22 58 9 37 13 0Z" />
      <path d="M21 8C22-19 28-38 38-54" />
      <path d="M34-47l7 4m-9 5 8 4m-11 5 8 4m-10 6 8 3" />
    </g>
    <path d="M145 558c109-33 278-33 392 0" />
  </BotanicalSvg>;
}

const prototypeIllustrations: Record<string, () => ReactNode> = {
  strelitzia: StrelitziaIllustration,
  bananiers: BananiersIllustration,
  alocasia: AlocasiaIllustration,
  monstera: MonsteraIllustration,
  anthurium: AnthuriumIllustration,
};

export function hasGenusPrototypeIllustration(genre: string) {
  return genre in prototypeIllustrations;
}

export function GenusPrototypeIllustration({ genre }: { genre: string }) {
  const Illustration = prototypeIllustrations[genre];
  return Illustration ? <Illustration /> : null;
}
