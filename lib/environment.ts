const configuredShopOrigin = process.env.NEXT_PUBLIC_SHOP_URL;
if (!configuredShopOrigin) {
  throw new Error("NEXT_PUBLIC_SHOP_URL must be set by the deployment build contract.");
}
export const SHOP_ORIGIN = configuredShopOrigin;

export function shopUrl(path = "/") {
  return new URL(path, `${SHOP_ORIGIN}/`).toString();
}
