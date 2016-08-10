# nazr.in

[![Build Status](https://travis-ci.org/oame/nazr.in.svg?branch=master)](https://travis-ci.org/oame/nazr.in) [![Coverage Status](https://coveralls.io/repos/github/oame/nazr.in/badge.svg?branch=master)](https://coveralls.io/github/oame/nazr.in?branch=master)

[nazr.in](http://nazr.in) is an open-source url shortener service.

## Stack

[MERN](http://mern.io) stack.

## Build

```
$ npm install
$ npm start
```

## APIs

> This is ongoing project thus the APIs might be revised. Better check README consistently.

__api.nazr.in__ is the endpoint of API services.

### POST /short_links

Parameters: `{url: String}`

Returns: `{url: String, base62: String}`

### GET /short_links/:base62

Parameters: `:base62`

Returns: `{url: String, base62: String}`
