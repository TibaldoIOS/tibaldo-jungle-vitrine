import { toPlantApiV2 } from "@/lib/plants/api-contract";
import { plants } from "@/lib/plants/catalog";
import { mediaRegistryVersionFor, toVerifiedMediaApiFields, verifiedMediaApiContractVersion } from "@/lib/plants/verified-media-api-contract";

export const dynamic = "force-static";

export function GET() {
  const registryVersion = mediaRegistryVersionFor(plants);
  return Response.json(plants.map((plant) => ({
    ...toPlantApiV2(plant),
    ...toVerifiedMediaApiFields(plant, registryVersion),
  })), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
      "X-Tibaldo-Contract-Version": "2.0",
      "X-Tibaldo-Media-Contract-Version": verifiedMediaApiContractVersion,
    },
  });
}
