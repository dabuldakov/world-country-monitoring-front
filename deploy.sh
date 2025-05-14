set -e  # Прерывать при ошибках

echo "🚀 Starting deploy script..."

cd ~/world-country-monitoring-deploy || exit

git pull
docker compose build
docker compose up -d

echo "🎉 Deployment completed!"