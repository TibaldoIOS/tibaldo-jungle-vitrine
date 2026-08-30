import { isBetaJungleDeployment } from "@/lib/deployment-mode";

export function BetaEnvironmentBanner() {
  const banner = process.env.NEXT_PUBLIC_JUNGLE_BANNER;
  if (!isBetaJungleDeployment || !banner) return null;
  return <aside className="jungle-beta-banner" role="note">{banner}</aside>;
}
