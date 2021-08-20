FROM registry.sensetime.com/mercury/infra/nginx:v1.17.10

COPY ./dist /app
COPY nginx.conf /etc/nginx/nginx.conf
