# nazr.in

[nazr.in](http://nazr.in) is a open-source url shortener service.

## Stacks

[MERN](http://mern.io) stacks.

## Build

```
$ npm install
$ npm start
```

## APIs

> This is ongoing project and the APIs might be revised. Better check README frequently.

__api.nazr.in__ is an endpoint of API service.

### POST /short_links

Parameters: `{url: String}`

Returns: `{url: String, base62: String}`

### GET /short_links/:base62

Parameters: `:base62`

Returns: `{url: String, base62: String}`
