Note:
Monitoring main economic and social values.

Tehcnoligoies:
react with rechats framework.

## Деплой

Фронтенд деплоится как отдельный Docker Compose-проект (nginx со статикой).
Запросы к API (`/api/...`) проксируются в бэкенд по общей Docker-сети `wcm-net`
на адрес `http://backend:8080`.

```bash
# один раз на сервере
docker network create wcm-net
git clone https://github.com/dabuldakov/world-country-monitoring-front.git ~/world-country-monitoring-front
cd ~/world-country-monitoring-front
cp .env.example .env
docker compose up -d --build
```

Приложение доступно на `http://90.188.89.63:8097`.

### Автодеплой

При push в `main` GitHub Actions по SSH заходит на сервер и пересобирает проект
(как в репозитории `makeup`):

```bash
cd "$DEPLOY_PATH"
git fetch --prune origin main && git reset --hard origin/main
docker compose up -d --build
```

Workflow — `.github/workflows/deploy.yml` (запуск вручную: Actions → deploy → Run workflow).

Секреты репозитория (Settings → Secrets and variables → Actions → Secrets):

| Секрет | Значение |
|--------|----------|
| `DEPLOY_HOST` | `90.188.89.63` |
| `DEPLOY_USER` | `dmitry_buldakov` |
| `DEPLOY_PORT` | `2222` |
| `DEPLOY_SSH_KEY` | приватный ключ `~/.ssh/deploy_ci_ed25519` |
| `DEPLOY_PATH` | `/home/dmitry_buldakov/world-country-monitoring-front` |
