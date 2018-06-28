# nazr.in

[![Build Status](https://travis-ci.org/oame/nazr.in.svg?branch=master)](https://travis-ci.org/oame/nazr.in) [![Coverage Status](https://coveralls.io/repos/github/oame/nazr.in/badge.svg?branch=master)](https://coveralls.io/github/oame/nazr.in?branch=master)

[nazr.in](http://nazr.in) is an open source url shortener service built on Express and React.

## Build

```
npm install
npm run watch
```

## APIs

> This is an ongoing project thus the APIs might be revised. Better check README.

**nazr.in** is the endpoint of the nazr.in APIs.

### POST /api/short_links

Parameters: `{url: String}`

Returns: `{shortURL: String}`

### GET /api/short_links/:base62

Parameters: `:base62`

Returns: `{url: String, base62: String}`
