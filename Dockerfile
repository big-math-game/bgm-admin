FROM busybox
COPY __sapper__/export /dist
CMD rm -rf /usr/share/nginx/html/* && cp -a /dist/. /usr/share/nginx/html ; tail -f /dev/null
