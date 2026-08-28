import DeliciosaScrollStoryD from "@/app/__lab/deliciosa/DeliciosaScrollStoryD";
import { assertJungleLabEnabled } from "@/lib/lab-access";
import { notFound } from "next/navigation";

export default function DeliciosaScrollStoryDLabPage() {
  if (!assertJungleLabEnabled()) notFound();
  return <DeliciosaScrollStoryD />;
}
