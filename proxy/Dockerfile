# FROM nginx:latest
FROM nginx:1.27.3-alpine

RUN rm /etc/nginx/nginx.conf

RUN chmod -R 755 /var/log/nginx && \
    chown -R root:root /var/log/nginx


COPY nginx.conf /etc/nginx/nginx.conf

# COPY ./.htpasswd /etc/nginx/.htpasswd
