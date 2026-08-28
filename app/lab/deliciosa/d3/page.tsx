import DeliciosaScrollStoryD3 from "@/app/__lab/deliciosa/DeliciosaScrollStoryD3";
import { assertJungleLabEnabled } from "@/lib/lab-access";
import { notFound } from "next/navigation";

export default function DeliciosaScrollStoryD3LabPage() {
  if (!assertJungleLabEnabled()) notFound();
  return <DeliciosaScrollStoryD3 />;
}
