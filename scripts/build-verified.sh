#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ "${SITES_ENV_READY:-}" != "1" ]]; then
  exec "${script_dir}/sites-env.sh" -- "$0" "$@"
fi

# PUBLIC must be requested explicitly. Missing or unknown values remain in the
# closed BETA mode, while contradictory values fail instead of producing an
# artifact whose indexing policy cannot be proven.
jungle_env="${JUNGLE_ENV:-beta}"
next_public_jungle_env="${NEXT_PUBLIC_JUNGLE_ENV:-${jungle_env}}"

case "${jungle_env}" in
  beta|public) ;;
  *)
    echo "Unsupported JUNGLE_ENV=${jungle_env}. Expected beta or public." >&2
    exit 64
    ;;
esac

case "${next_public_jungle_env}" in
  beta|public) ;;
  *)
    echo "Unsupported NEXT_PUBLIC_JUNGLE_ENV=${next_public_jungle_env}. Expected beta or public." >&2
    exit 64
    ;;
esac

if [[ "${jungle_env}" != "${next_public_jungle_env}" ]]; then
  echo "JUNGLE_ENV and NEXT_PUBLIC_JUNGLE_ENV must match." >&2
  exit 64
fi

case "${jungle_env}" in
  public)
    expected_jungle_origin="https://jungle.tibaldo.fr"
    expected_shop_origin="https://shop.tibaldo.fr"
    expected_banner=""
    ;;
  beta)
    expected_jungle_origin="https://beta-jungle.tibaldo.fr"
    expected_shop_origin="https://beta-shop.tibaldo.fr"
    expected_banner="MODE BÊTA / TEST — ENVIRONNEMENT DE DÉMONSTRATION"
    ;;
esac

configured_jungle_origin="${NEXT_PUBLIC_JUNGLE_ORIGIN:-${expected_jungle_origin}}"
configured_shop_origin="${NEXT_PUBLIC_SHOP_URL:-${expected_shop_origin}}"
configured_banner="${NEXT_PUBLIC_JUNGLE_BANNER:-${expected_banner}}"

if [[ "${configured_jungle_origin}" != "${expected_jungle_origin}" ]]; then
  echo "NEXT_PUBLIC_JUNGLE_ORIGIN does not match the selected deployment mode." >&2
  exit 64
fi
if [[ "${configured_shop_origin}" != "${expected_shop_origin}" ]]; then
  echo "NEXT_PUBLIC_SHOP_URL does not match the selected deployment mode." >&2
  exit 64
fi
if [[ "${configured_banner}" != "${expected_banner}" ]]; then
  echo "NEXT_PUBLIC_JUNGLE_BANNER does not match the selected deployment mode." >&2
  exit 64
fi

export JUNGLE_ENV="${jungle_env}"
export NEXT_PUBLIC_JUNGLE_ENV="${next_public_jungle_env}"
export NEXT_PUBLIC_JUNGLE_ORIGIN="${configured_jungle_origin}"
export NEXT_PUBLIC_SHOP_URL="${configured_shop_origin}"
export NEXT_PUBLIC_JUNGLE_BANNER="${configured_banner}"

vinext="${SITES_PROJECT_ROOT}/node_modules/.bin/vinext"
if [[ ! -x "${vinext}" ]]; then
  echo "vinext is unavailable. Run npm run install:ci and wait for it to finish before building." >&2
  exit 69
fi

echo "Running bounded vinext ${JUNGLE_ENV} build..."
if command -v timeout >/dev/null; then
  timeout \
    --signal=TERM \
    --kill-after="${SITES_BUILD_KILL_AFTER:-10s}" \
    "${SITES_BUILD_TIMEOUT:-3m}" \
    "${vinext}" build
else
  "${vinext}" build
fi

"${script_dir}/validate-artifact.sh"
