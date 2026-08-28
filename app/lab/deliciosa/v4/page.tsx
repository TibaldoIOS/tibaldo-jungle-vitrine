import DeliciosaKnowledgeScrollV4 from "@/app/__lab/deliciosa/v4/DeliciosaKnowledgeScrollV4";
import { assertJungleLabEnabled } from "@/lib/lab-access";
import { notFound } from "next/navigation";

export default function Page() {
  if (!assertJungleLabEnabled()) notFound();
  return <DeliciosaKnowledgeScrollV4 />;
}
