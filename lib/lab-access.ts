export function assertJungleLabEnabled() {
  if (process.env.JUNGLE_LAB_ENABLED !== "1") {
    return false;
  }
  return true;
}
