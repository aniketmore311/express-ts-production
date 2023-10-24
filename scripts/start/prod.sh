set -o errexit 
set -o nounset
set -o pipefail

export NODE_ENV=production
export APP_NAME=your-app-name

npx tsc
npx pm2-runtime dist/server.js
