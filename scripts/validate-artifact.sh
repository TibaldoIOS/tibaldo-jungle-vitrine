#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ "${SITES_ENV_READY:-}" != "1" ]]; then
  exec "${script_dir}/sites-env.sh" -- "$0" "$@"
fi

worker="${SITES_PROJECT_ROOT}/dist/server/index.js"
hosting="${SITES_PROJECT_ROOT}/dist/.openai/hosting.json"

[[ -f "${worker}" ]] || {
  echo "Missing Sites Worker entry: dist/server/index.js" >&2
  exit 66
}
[[ -f "${hosting}" ]] || {
  echo "Missing packaged Sites manifest: dist/.openai/hosting.json" >&2
  exit 66
}

case "${JUNGLE_ENV:-beta}" in
  public) expected_project_id="appgprj_6a6dde04153c8191b9b8551a9f22db92" ;;
  beta) expected_project_id="appgprj_6a886983ea608191bcbe0be21a2f907d" ;;
  *)
    echo "Cannot validate artifact for unsupported JUNGLE_ENV=${JUNGLE_ENV:-}" >&2
    exit 64
    ;;
esac

node --input-type=module - "${worker}" "${hosting}" "${expected_project_id}" <<'NODE'
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const [workerPath, hostingPath, expectedProjectId] = process.argv.slice(2);
const hosting = JSON.parse(await readFile(hostingPath, "utf8"));
if (hosting.project_id !== expectedProjectId) {
  throw new Error(`Sites project mismatch for artifact: ${hosting.project_id ?? "missing"}`);
}

const workerUrl = pathToFileURL(workerPath);
workerUrl.searchParams.set("sites-validation", `${process.pid}-${Date.now()}`);
const worker = await import(workerUrl.href);
if (!worker.default || typeof worker.default.fetch !== "function") {
  throw new Error("dist/server/index.js must have an ESM default export with fetch(request, env, ctx)");
}
NODE

if [[ "${JUNGLE_ENV:-beta}" == "public" ]]; then
  if rg -q 'beta-jungle\.tibaldo\.fr|beta-shop\.tibaldo\.fr|MODE BÊTA / TEST|tibaldo\.chatgpt\.site' "${SITES_PROJECT_ROOT}/dist/client" "${SITES_PROJECT_ROOT}/dist/server"; then
    echo "PUBLIC artifact contains a BETA/staging host or customer-visible BETA marker." >&2
    exit 65
  fi
fi

echo "Validated Sites artifact: ESM Worker default.fetch and hosting manifest are present."
