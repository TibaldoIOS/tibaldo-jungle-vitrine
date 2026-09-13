import { permanentRedirectResponse } from "@/lib/seo/permanent-redirect";
import { p1AliasCanonicalMap } from "@/lib/plants/encyclopedia-p1-expansion";
export const GET = (request: Request) => permanentRedirectResponse(request, p1AliasCanonicalMap["/plantes/monstera/albo"]);
