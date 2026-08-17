import { permanentRedirectResponse } from "@/lib/seo/permanent-redirect";
export const GET = (request: Request) => permanentRedirectResponse(request, "/sos-plantes");
