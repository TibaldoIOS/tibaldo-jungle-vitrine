import { permanentRedirectResponse } from "@/lib/seo/permanent-redirect";
export const GET = (request: Request) => permanentRedirectResponse(request, "/fleurs-sur-commande-lille");
