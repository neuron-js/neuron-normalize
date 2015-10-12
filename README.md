[![NPM version](https://badge.fury.io/js/neuron-normalize.svg)](http://badge.fury.io/js/neuron-normalize)
[![npm module downloads per month](http://img.shields.io/npm/dm/neuron-normalize.svg)](https://www.npmjs.org/package/neuron-normalize)
[![Build Status](https://travis-ci.org/neuron-js/neuron-normalize.svg?branch=master)](https://travis-ci.org/neuron-js/neuron-normalize)
[![Dependency Status](https://david-dm.org/neuron-js/neuron-normalize.svg)](https://david-dm.org/neuron-js/neuron-normalize)

# neuron-normalize

<!-- description -->
A small module to normalize a url to a formatted object.

## Install

```sh
$ npm install neuron-normalize --save
```

## Usage

```js

var options = {
  root: '/mod'
};

var normalize = require('neuron-normalize')(options);

normalize.parse('zepto');
->
{
    package: 'zepto@*',
    package_name: 'zepto',
    id: 'zepto@*/zepto.js',
    version: '*',
    path: '/zepto.js'
}

normalize.to_url('zepto');
->
'/mod/zepto/*/zepto.js'

normalize.to_package('/mod/zepto/*/zepto.js');
->
{
    package: 'zepto@*',
    package_name: 'zepto',
    id: 'zepto@*/zepto.js',
    version: '*',
    path: '/zepto.js'
}

```

### options
- root `String` Absolute path from root to the module. **Required**

## Module File Object

type: `Object`
    - package: `<module_name>@<version>`
    - package_name: `<module_name>`
    - id: `<module_name>@<version><file_path>`
    - version: `<major>.<minor>.<patch>`, default to `'*'`
    - path: `/path/to/<filename>.<ext>`, default to `/<package-name>.js`

## API

### normalize.parse(id)
- id `String` formatted module id

Returns `Object` Module File Object

### normalize.to_url(id)
- id `String` formatted module id

```js
'zepto@1.0.0/lib/zepto.js'
```

Returns `Path` Absolute pathname of a file to the id, or `undefined` if not id passed in.
```js
'/mod/zepto/1.0.0/lib/zepto.js'
```

### normalize.to_package(pathname)
- pathname `Path` Absolute pathname of a file

```js
'/mod/zepto/*/zepto.js'
```

Returns `Object` Module File Object

## License

MIT
