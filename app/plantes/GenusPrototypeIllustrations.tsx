import type { ReactNode } from "react";

type IllustrationProps = {
  children: ReactNode;
};

function BotanicalSvg({ children }: IllustrationProps) {
  return <svg className="plant-genus-line-art is-detailed" viewBox="0 0 620 560" aria-hidden="true" focusable="false">
    <g>{children}</g>
  </svg>;
}

const broadLeafVeins = [-438, -415, -392, -369, -346, -323, -300, -279];

function StrelitziaLeaf({ transform }: { transform: string }) {
  return <g transform={transform}>
    <path d="M0 4C-6-82-5-171 0-252" />
    <path d="M0-252C-48-279-66-370-9-474C42-431 48-322 0-252Z" />
    <path d="M0-252C-1-327-4-402-9-471" />
    {broadLeafVeins.map((y, index) => {
      const progress = (y + 474) / 222;
      const spread = 11 + Math.sin(progress * Math.PI) * 40;
      return <g key={y}>
        <path d={`M${-8 + progress * 8} ${y}C${-18 - spread * .25} ${y + 7} ${-spread * .78} ${y + 14} ${-spread} ${y + 22}`} />
        <path d={`M${-8 + progress * 8} ${y}C${10 + spread * .25} ${y + 8} ${spread * .72} ${y + 16} ${spread * .9} ${y + 25}`} />
      </g>;
    })}
  </g>;
}

function StrelitziaIllustration() {
  return <BotanicalSvg>
    <StrelitziaLeaf transform="translate(318 558) rotate(-44) scale(.77)" />
    <StrelitziaLeaf transform="translate(324 558) rotate(-27) scale(.92)" />
    <StrelitziaLeaf transform="translate(329 558) rotate(-10) scale(1.04)" />
    <StrelitziaLeaf transform="translate(335 558) rotate(7) scale(1.12)" />
    <StrelitziaLeaf transform="translate(341 558) rotate(23) scale(.98)" />
    <StrelitziaLeaf transform="translate(347 558) rotate(41) scale(.82)" />
    <g transform="translate(293 250) rotate(-8)">
      <path d="M0 294C-2 205 3 112 17 25" />
      <path d="M17 25c31 9 58 8 88-4-18 22-46 32-83 28" />
      <path d="M21 23c13-25 30-42 52-51-2 25-14 43-38 56" />
      <path d="M42 15c22-29 45-45 70-48-7 27-25 45-55 55" />
    </g>
    <path d="M274 557c36-18 92-18 127 0" />
  </BotanicalSvg>;
}

const alocasiaVeins = [-281, -251, -221, -191, -161, -131, -101];

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
        <path className="botanical-vein-fine" d={`M${-width * .38} ${y + 18}l${-width * .18} 24M${width * .38} ${y + 18}l${width * .18} 24`} />
      </g>;
    })}
  </g>;
}

function AlocasiaIllustration() {
  return <BotanicalSvg>
    <AlocasiaLeaf transform="translate(230 559) rotate(-25) scale(.82)" />
    <AlocasiaLeaf transform="translate(334 559) rotate(-2) scale(1.08)" />
    <AlocasiaLeaf transform="translate(440 559) rotate(24) scale(.8)" />
    <path d="M185 558c82-27 226-27 303 0" />
  </BotanicalSvg>;
}

const monsteraVeins = [-292, -260, -228, -196, -164, -132, -103];

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
    <MonsteraLeaf transform="translate(218 559) rotate(-24) scale(.72)" />
    <MonsteraLeaf transform="translate(334 559) rotate(-1) scale(1.02)" />
    <MonsteraLeaf transform="translate(448 559) rotate(22) scale(.7)" />
    <MonsteraLeaf mature={false} transform="translate(511 558) rotate(43) scale(.48)" />
    <path d="M177 558c84-27 250-27 340 0" />
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
    <AnthuriumHeartLeaf transform="translate(224 559) rotate(-24) scale(.82)" />
    <AnthuriumLongLeaf transform="translate(334 559) rotate(-2) scale(1.03)" />
    <AnthuriumHeartLeaf transform="translate(445 559) rotate(24) scale(.78)" />
    <g transform="translate(493 420) rotate(19)">
      <path d="M0 136C-2 90 3 46 13 0" />
      <path d="M13 0C38 12 51 36 43 61C22 58 9 37 13 0Z" />
      <path d="M21 8C22-19 28-38 38-54" />
      <path d="M34-47l7 4m-9 5 8 4m-11 5 8 4m-10 6 8 3" />
    </g>
    <path d="M181 558c84-25 238-25 325 0" />
  </BotanicalSvg>;
}

const prototypeIllustrations: Record<string, () => ReactNode> = {
  strelitzia: StrelitziaIllustration,
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
