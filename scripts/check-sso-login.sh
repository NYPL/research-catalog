set -euo pipefail

PROFILE="${AWS_PROFILE:-default}"
CACHE_DIR="${HOME}/.aws/sso/cache"

# Find newest SSO cache file
CACHE_FILE=$(find "$CACHE_DIR" -type f -name "*.json" -print0 2>/dev/null \
  | xargs -0 ls -t 2>/dev/null | head -n1 || true)

if [[ -z "$CACHE_FILE" ]]; then
  echo "No SSO cache found, refreshing login"
  aws sso login --profile "$PROFILE"
  exit 0
fi

# Get expiry time
EXPIRES_AT=$(jq -r '.expiresAt' "$CACHE_FILE" 2>/dev/null || echo "")

if [[ -z "$EXPIRES_AT" ]]; then
  echo "Could not read expiry time, refreshing login"
  aws sso login --profile "$PROFILE"
  exit 0
fi

EXPIRES_AT_CLEAN=$(echo "$EXPIRES_AT" | sed 's/\.[0-9]\{1,\}Z$/Z/')

if [[ "$(uname)" == "Darwin" ]]; then
  # macOS
  EXPIRES_EPOCH=$(date -j -f "%Y-%m-%dT%H:%M:%SZ" "$EXPIRES_AT_CLEAN" +%s)
else
  # Linux/GNU
  EXPIRES_EPOCH=$(date -d "$EXPIRES_AT_CLEAN" +%s)
fi

NOW_EPOCH=$(date -u +%s)

if (( NOW_EPOCH > EXPIRES_EPOCH )); then
  echo "SSO token expired, refreshing login"
  aws sso login --profile "$PROFILE"
else
  echo "SSO token valid, continuing"
fi
