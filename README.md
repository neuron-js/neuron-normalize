[![NPM version](https://badge.fury.io/js/neuron-normalize.svg)](http://badge.fury.io/js/neuron-normalize)
[![npm module downloads per month](http://img.shields.io/npm/dm/neuron-normalize.svg)](https://www.npmjs.org/package/neuron-normalize)
[![Build Status](https://travis-ci.org/neuron-js/neuron-normalize.svg?branch=master)](https://travis-ci.org/neuron-js/neuron-normalize)
[![Dependency Status](https://david-dm.org/neuron-js/neuron-normalize.svg)](https://david-dm.org/neuron-js/neuron-normalize)

# neuron-normalize

<!-- description -->

## Install

```sh
$ npm install neuron-normalize --save
```

## Usage

```js
var normalize = require('neuron-normalize')(options);
```

### normalize.parse(id)

### normalize.to_url(id) -> parse -> url

- id `String` description

Returns the dddd

### normalize.to_package(pathname) // /path/to/lib/zepto.js

```
/mod/zepto/*/zepto.js
```

- pathname `Path` the absolute pathname of a file

Returns `Object`
    - package: `goods@1.0.0`
    - package_name: `goods`
    - id: `goods@1.0.0/style/list.css`
    - version: `1.0.0`, default to `'*'`
    - path: `/style/list.css`, default to `/<package-name>.js`

```
normalize.parse('zepto');
->
{
    package: 'zepto@*',
    package_name: 'zepto',
    id: 'zepto@*/zepto.js', // main entry -> <package-name>.js
    version: '*',
    path: '/zepto.js'
}
```


## License

MIT
