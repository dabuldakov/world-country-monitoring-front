set -e

echo "🚀 Starting deploy script..."

REPO_PATH="$HOME/world-country-monitoring-deploy"
DOCKERFILE_PATH="$REPO_PATH/frontend/Dockerfile"

cd "$REPO_PATH" || { echo "❌ Deployment directory not found"; exit 1; }

echo "🔄 Pulling latest changes..."
git pull || { echo "❌ Git pull failed"; exit 1; }

CURRENT_VERSION=$(grep -oP 'REPO_URL_V_\K\d+' "$DOCKERFILE_PATH" | head -1)
NEXT_VERSION=$((CURRENT_VERSION + 1))

echo "🔧 Updating REPO_URL_V_${CURRENT_VERSION} to REPO_URL_V_${NEXT_VERSION} in Dockerfile"

sed -i "s/REPO_URL_V_${CURRENT_VERSION}/REPO_URL_V_${NEXT_VERSION}/g" "$DOCKERFILE_PATH"

echo "🔄 Pushing latest changes..."
git add DOCKERFILE_PATH
git commit -m "Deployed new frontend version $NEXT_VERSION"
git push || { echo "❌ Git push failed"; exit 1; }

echo "🔨 Building containers..."
docker compose build || { echo "❌ Docker build failed"; exit 1; }

echo "🔄 Restarting services..."
docker compose up -d || { echo "❌ Docker compose up failed"; exit 1; }

echo "✅ Dockerfile updated to version ${NEXT_VERSION}"
echo "🎉 Deployment completed!"