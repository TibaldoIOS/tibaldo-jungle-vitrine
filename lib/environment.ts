export const SHOP_ORIGIN = process.env.NEXT_PUBLIC_SHOP_URL || "https://beta-shop.tibaldo.fr";

export function shopUrl(path = "/") {
  return new URL(path, `${SHOP_ORIGIN}/`).toString();
}
