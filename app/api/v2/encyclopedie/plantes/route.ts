import { toPlantApiV2 } from "@/lib/plants/api-contract";
import { plants } from "@/lib/plants/catalog";

export const dynamic = "force-static";

export function GET() {
  return Response.json(plants.map(toPlantApiV2), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
      "X-Tibaldo-Contract-Version": "2.0",
    },
  });
}
