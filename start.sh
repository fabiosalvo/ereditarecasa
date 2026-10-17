#!/bin/sh
# Avvia il server delle API in locale e Caddy in primo piano; se uno dei due si ferma, il container si riavvia.
HOST=127.0.0.1 PORT=4321 node dist/server/entry.mjs &
NODE_PID=$!
caddy run --config /etc/caddy/Caddyfile --adapter caddyfile &
CADDY_PID=$!
while kill -0 $NODE_PID 2>/dev/null && kill -0 $CADDY_PID 2>/dev/null; do sleep 2; done
exit 1
