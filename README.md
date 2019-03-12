# nazr.in

[![Build Status](https://travis-ci.org/oame/nazr.in.svg?branch=master)](https://travis-ci.org/oame/nazr.in) [![Coverage Status](https://coveralls.io/repos/github/oame/nazr.in/badge.svg?branch=master)](https://coveralls.io/github/oame/nazr.in?branch=master)

[nazr.in](https://nazr.in) is an open source url shortener service built on Express and React.

## Build

```
yarn
yarn workspaces
```

## APIs

**https://nazr.in** is the endpoint for the nazr.in APIs.

### POST /api/short_links

Parameters: `{url: String}`

Returns: `{shortURL: String}`

### GET /api/short_links/:base62

Parameters: `:base62`

Returns: `{url: String, base62: String}`
