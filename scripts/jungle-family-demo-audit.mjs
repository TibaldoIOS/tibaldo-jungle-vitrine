import { chromium } from "playwright-core";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { plants } from "../lib/plants/catalog.ts";

const baseUrl = process.argv[2];
const outputDirectory = process.argv[3];

if (!baseUrl || !outputDirectory) {
  throw new Error(
    "Usage: node --experimental-strip-types scripts/jungle-family-demo-audit.mjs <base-url> <output-directory>",
  );
}

const genusHubs = [
  "agave",
  "fatsia",
  "strelitzia",
  "cycas",
  "dicksonia",
  "alocasia",
  "anthurium",
  "monstera",
  "philodendron",
  "epipremnum",
  "asparagus",
  "colocasia",
  "pilea",
  "peperomia",
  "maranta",
  "calathea",
  "cactus",
  "epiphyllum",
];

const familyRoutes = [
  ...new Set(plants.map((plant) => plant.taxonomy.family.toLowerCase())),
].map((family) => `/plantes/famille/${family}`);

const routeRecords = [
  { route: "/plantes", expectedType: "PLANT_INDEX" },
  ...genusHubs.map((genre) => ({
    route: `/plantes/${genre}`,
    expectedType: "GENUS_HUB",
  })),
  { route: "/plantes/bananiers", expectedType: "OTHER_PLANT_PAGE" },
  ...familyRoutes.map((route) => ({ route, expectedType: "FAMILY_HUB" })),
  ...plants.map((plant) => ({
    route: `/plantes/${plant.genre}/${plant.slug}`,
    expectedType: plant.taxonomy.cultivar ? "CULTIVAR" : "SPECIES",
  })),
];

const visualRoutes = new Set([
  "/plantes",
  "/plantes/monstera",
  "/plantes/monstera/deliciosa",
  "/plantes/monstera/thai-constellation",
  "/plantes/anthurium",
  "/plantes/anthurium/veitchii",
  "/plantes/anthurium/pallidiflorum",
]);

const viewports = [
  { width: 390, height: 844 },
  { width: 820, height: 1180 },
  { width: 1440, height: 1024 },
];

const slug = (route) =>
  route
    .replace(/^\//, "")
    .replaceAll("/", "-")
    .replace(/[^a-z0-9-]/gi, "-");

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--no-first-run", "--disable-background-networking"],
});

const results = [];

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport,
      reducedMotion: "reduce",
      deviceScaleFactor: 1,
    });

    for (const record of routeRecords) {
      const page = await context.newPage();
      const consoleErrors = [];
      const pageErrors = [];
      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
      });
      page.on("pageerror", (error) => pageErrors.push(error.message));

      const response = await page.goto(new URL(record.route, baseUrl).href, {
        waitUntil: "load",
        timeout: 45_000,
      });
      await page.waitForTimeout(250);

      const metrics = await page.evaluate(() => {
        const main = document.querySelector("main");
        const rootClasses = main?.className ?? "";
        const template = rootClasses.includes("deliciosa-standard-species")
          ? "OWNER_HERO_STANDARD_SPECIES_BODY"
          : rootClasses.includes("thai-profile-v3")
            ? "THAI_EDITORIAL_V3"
            : rootClasses.includes("veitchii-profile-v2")
              ? "VEITCHII_EDITORIAL_V2"
              : document.querySelector(".plant-profile-layout")
                ? "STANDARD_SPECIES"
                : document.querySelector(".anthurium-genus-v2")
                  ? "ANTHURIUM_GENUS_V2"
                  : document.querySelector(".genus-pilot-v21")
                    ? "GENUS_V21"
                    : document.querySelector(".family-guide")
                      ? "STANDARD_GENUS"
                      : document.querySelector(".plant-family-page")
                        ? "FAMILY_HUB"
                        : document.querySelector(".plants-hub-hero")
                          ? "PLANT_INDEX_V3"
                          : "OTHER";

        const suspiciousEmptySurfaces = [...document.querySelectorAll("main *")]
          .map((element) => {
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            const hasContent = Boolean(
              element.textContent?.trim() || element.querySelector("img,svg,video"),
            );
            return {
              tag: element.tagName,
              className:
                typeof element.className === "string" ? element.className : "",
              width: Math.round(rect.width),
              height: Math.round(rect.height),
              background: style.backgroundColor,
              hasContent,
              hidden: element.getAttribute("aria-hidden") === "true",
            };
          })
          .filter(
            (item) =>
              !item.hidden &&
              !item.hasContent &&
              item.width * item.height > 35_000 &&
              item.height > 100 &&
              item.background !== "rgba(0, 0, 0, 0)",
          )
          .slice(0, 20);

        return {
          title: document.title,
          h1Count: document.querySelectorAll("h1").length,
          h1: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim(),
          mainLandmark: Boolean(main),
          robots: document.querySelector('meta[name="robots"]')?.getAttribute("content"),
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth: window.innerWidth,
          overflowX: document.documentElement.scrollWidth - window.innerWidth,
          brokenImages: [...document.images]
            .filter((image) => image.complete && image.naturalWidth === 0)
            .map((image) => image.currentSrc || image.src),
          template,
          rootClasses,
          heroSystem: document.querySelector(".species-next-hero")
            ? "DELICIOSA_OWNER_KEEP"
            : document.querySelector(".plant-profile-hero")
              ? "STANDARD_SPECIES_HERO"
              : document.querySelector(".photo-genus-hero")
                ? "PHOTO_GENUS_HERO"
                : document.querySelector(".botanical-genus-hero")
                  ? "BOTANICAL_GENUS_HERO"
                  : "STANDARD_OR_OTHER",
          navigationSystem: document.querySelector(".plant-section-nav")
            ? "STANDARD_SPECIES_NAV"
            : document.querySelector(".thai-v3-layout .plant-section-nav")
              ? "EDITORIAL_SPECIES_NAV"
              : "NONE_OR_GLOBAL",
          comparisonSystem: document.querySelector(".plant-comparison-grid")
            ? "STANDARD_COMPARISON"
            : document.querySelector(".thai-v3-comparison")
              ? "THAI_COMPARISON"
              : document.querySelector(".veitchii-comparison")
                ? "VEITCHII_COMPARISON"
                : "NONE",
          suspiciousEmptySurfaces,
        };
      });

      if (visualRoutes.has(record.route)) {
        await page.screenshot({
          path: path.join(
            outputDirectory,
            `${slug(record.route)}-${viewport.width}-full.png`,
          ),
          fullPage: true,
          animations: "disabled",
        });
      }

      results.push({
        ...record,
        viewport: viewport.width,
        httpStatus: response?.status() ?? null,
        consoleErrors,
        pageErrors,
        ...metrics,
      });
      await page.close();
    }

    await context.close();
  }
} finally {
  await browser.close();
}

const summary = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  routeCount: routeRecords.length,
  checkCount: results.length,
  failures: results.filter(
    (item) =>
      item.httpStatus !== 200 ||
      !item.mainLandmark ||
      item.h1Count !== 1 ||
      !item.robots?.includes("noindex") ||
      item.overflowX > 0 ||
      item.brokenImages.length ||
      item.consoleErrors.length ||
      item.pageErrors.length,
  ),
  suspiciousEmptySurfaces: results.filter(
    (item) => item.suspiciousEmptySurfaces.length,
  ),
  results,
};

await writeFile(
  path.join(outputDirectory, "route-matrix.json"),
  `${JSON.stringify(summary, null, 2)}\n`,
  "utf8",
);

console.log(
  JSON.stringify(
    {
      routeCount: summary.routeCount,
      checkCount: summary.checkCount,
      failureCount: summary.failures.length,
      suspiciousSurfaceChecks: summary.suspiciousEmptySurfaces.length,
    },
    null,
    2,
  ),
);
