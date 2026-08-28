import DeliciosaScrollStoryD2 from "@/app/__lab/deliciosa/DeliciosaScrollStoryD2";
import { assertJungleLabEnabled } from "@/lib/lab-access";
import { notFound } from "next/navigation";

export default function DeliciosaScrollStoryD2LabPage() {
  if (!assertJungleLabEnabled()) notFound();
  return <DeliciosaScrollStoryD2 />;
}
