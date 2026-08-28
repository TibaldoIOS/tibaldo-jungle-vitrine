import Image from "next/image";

const poster = "/media/plantes-mur-vegetal-poster-v19.webp";

export default function PlantsHeroMedia() {
  return (
    <div className="plants-hub-video" aria-hidden="true">
      <video autoPlay muted loop playsInline preload="metadata" poster={poster} tabIndex={-1}>
        <source src="/media/plantes-mur-vegetal-hero-v19.mp4" type="video/mp4" />
      </video>
      <Image
        unoptimized
        className="plants-hub-video-poster"
        src={poster}
        alt=""
        width={960}
        height={1707}
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
}
