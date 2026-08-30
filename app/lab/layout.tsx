import { isPublicJungleDeployment } from "@/lib/deployment-mode";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

export default function LabLayout({ children }: { children: ReactNode }) {
  if (isPublicJungleDeployment) notFound();
  return children;
}
