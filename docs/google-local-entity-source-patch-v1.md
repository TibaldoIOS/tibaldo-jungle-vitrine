# Google local entity — source-only patch, 2026-09-09

Base: 8cc51055ba314d51cbdb6f13f7767e20eb670439.
Frozen recovery tree: b8008fe6ab7713da076233ffe38eeeb8871a154f.

The Owner supplied the Maps URL, coordinates and social accounts in the mission.
The Maps short URL returned HTTP 302 to a Google Maps place bearing the Studio name
and 3 place de l'Arbonnoise, 59000 Lille. Coordinates are Owner-confirmed values,
not an independently verified geocoding result; a map viewport center is not proof
of the exact business marker. No unavailable Google data overrides the opening hours.

OpenAgenda: the Owner confirms an existing opening-event listing. Its exact listing
URL is not present in the recovered source. Evidence status: OWNER_REPORTED,
URL_UNVERIFIED. Preserve this citation lead; do not fabricate a link, duplicate the
event or block delivery for unavailable metadata.

Google reviews: NOT_IMPLEMENTED. GBP/Places API authorization remains PENDING.
No review, rating, scraping, third-party script or new embed is introduced.

The homepage in the exact base has no coordinate element. A single vertical
coordinate label is introduced; the photo, copy and heading remain untouched.
The shared footer carries the links throughout the site; no species-specific
social section is added. Contact/Boutique maps become passive external links.

Delivery: new GitHub feature branch only. No Sites upload, provider branch update,
BETA deployment, PUBLIC deployment or mutation of the frozen recovery branch.
