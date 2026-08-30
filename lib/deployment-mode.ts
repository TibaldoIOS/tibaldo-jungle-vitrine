import type { Metadata } from "next";

export type JungleDeploymentMode = "beta" | "public";

/**
 * PUBLIC must always be requested explicitly at build time. Missing, unknown,
 * or misspelled values stay in the closed BETA mode.
 */
export function resolveJungleDeploymentMode(value: string | undefined): JungleDeploymentMode {
  return value === "public" ? "public" : "beta";
}

export const jungleDeploymentMode = resolveJungleDeploymentMode(
  process.env.NEXT_PUBLIC_JUNGLE_ENV,
);

export const isPublicJungleDeployment = jungleDeploymentMode === "public";
export const isBetaJungleDeployment = !isPublicJungleDeployment;

const configuredJungleOrigin = process.env.NEXT_PUBLIC_JUNGLE_ORIGIN;
if (!configuredJungleOrigin) {
  throw new Error("NEXT_PUBLIC_JUNGLE_ORIGIN must be set by the deployment build contract.");
}
export const jungleOrigin = configuredJungleOrigin;

export const betaOnlyRobots: Metadata["robots"] = isBetaJungleDeployment
  ? {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    }
  : undefined;

