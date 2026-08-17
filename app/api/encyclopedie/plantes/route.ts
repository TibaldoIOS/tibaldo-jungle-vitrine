import { plants } from "@/lib/plants/catalog";
import { toPlantApiV1 } from "@/lib/plants/api-contract";

export const dynamic = "force-static";

export function GET() {
  const entries = plants.map(toPlantApiV1);

  return Response.json(entries, {
    headers: {
      "Access-Control-Allow-Origin": "https://caisse.tibaldo.fr",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
}
