import DeliciosaArtDirectionLabV1 from "@/app/__lab/deliciosa/art-direction-v1/DeliciosaArtDirectionLabV1";
import { assertJungleLabEnabled } from "@/lib/lab-access";
import { notFound } from "next/navigation";

export default function Page() {
  if (!assertJungleLabEnabled()) notFound();
  return <DeliciosaArtDirectionLabV1 />;
}
