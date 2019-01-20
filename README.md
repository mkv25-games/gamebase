# Gamebase

Template for creating HTML/JS games.

# Local Dev

## Enable HTTPS

Create certificates:

```
openssl req -config cert.conf -new -sha256 -newkey rsa:2048 -nodes -keyout gamebase.dev.key -x509 -days 365 -out gamebase.dev.crt
```

Modify your `/etc/hosts` file, and add the line:

```
127.0.0.1       gamebase.dev
```

Add `gamebase.dev.crt` to your machine's trusted root certificates.

## Start the dev server

`npm run watch`
