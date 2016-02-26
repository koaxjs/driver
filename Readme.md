
# driver

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Koax drivers. Drivers are very similar to observables. A `subscriber` push changes to a `listener`. The difference between koax drivers and observables is that listeners are action creators and can optionally be generators. Additionaly, for the time being, a driver can only have one listener.

## Installation

    $ npm install @koax/driver

## Usage

```js
import driver from '@koax/driver'
import bindUrl from 'bind-url'

let subscriber = next => bindUrl(next)
let {drive} = driver(subscriber)
let listener = url => {type: 'CHANGE_URL', url}
drive(listener)

```

## API

### driver(subscriber)

- `subscriber` - a function with signature `subscriber(next)`. `next` receives the next value in the driver sequence.

**Returns:** {drive, next}

### drive(listener)

- `listener` - an action creator

### next(val)

- `val` - push val to `listener`

## License

MIT

[travis-image]: https://img.shields.io/travis/koaxjs/driver.svg?style=flat-square
[travis-url]: https://travis-ci.org/koaxjs/driver
[git-image]: https://img.shields.io/github/tag/koaxjs/driver.svg?sytle=flat-square
[git-url]: https://github.com/koaxjs/driver
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@koax/driver.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@koax/driver