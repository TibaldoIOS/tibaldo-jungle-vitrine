export const permanentRedirectResponse = (request: Request, destination: string) =>
  new Response(null, {
    status: 301,
    headers: {
      Location: new URL(destination, request.url).toString(),
      "Cache-Control": "public, max-age=3600",
    },
  });
