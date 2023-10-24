set -o errexit 
set -o nounset
set -o pipefail
export NODE_ENV=production
export APP_NAME=your-app-name
npx nodemon src/server.ts