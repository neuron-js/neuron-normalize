'use strict';
var path = require('path');

var normalizer = {};

normalizer.to_url = function id_to_url(id) {
  if(!id) {
    return undefined;
  }
  var packageInfo = this.parse(id);
  return path.join(this.rootPath, packageInfo.id.replace(/\@/,'/'));
};

/*
 * function parse
 * desc:
 * params:
 * @id: package id, 'zepto@1.0.0/lib/zepto.js'
 */

normalizer.to_package = function url_to_package(pathname) {
  if(!pathname) {
    return undefined;
  }

  var rawPath = path.relative(this.rootPath, pathname);
  var parts = rawPath.split('/');

  var package_name = parts.shift();
  var version = parts.shift();
  var relativePath = '/' + parts.join('/');

  return this.parse([package_name, '@', version, relativePath].join(''));
};


/*
 * function parse
 * params:
 * @id: package id, 'zepto@1.0.0/lib/zepto.js'
 */
normalizer.parse = function parse(id) {
  var versionRegex = /@((?:\d\.)*\d||\*)/;
  var pathRegex = /\/(?:.*\/).*/;
  var versionMatches = id.match(versionRegex);
  var relativePathMatches = id.match(pathRegex);

  var package_name = id;
  if(versionMatches) {
    package_name = id.substring(0, versionMatches.index);
  } else if(relativePathMatches) {
    package_name = id.substring(0, relativePathMatches.index);
  }

  var version = (versionMatches && versionMatches[1]) || '*';
  var relativePath = (relativePathMatches && relativePathMatches[0]) || ['/', package_name, '.js'].join('');

  return {
    id: [package_name, '@', version, relativePath].join(''),
    package: [package_name, '@', version].join(''),
    package_name: package_name,
    version: version,
    path: relativePath
  };
};


module.exports = function(options){
  options = options || {};
  if(!options.root) {
    throw 'Error: Params missing \'root\' during initialization.';
  }

  normalizer.rootPath = options.root;

  // check for absolute path
  if(!path.isAbsolute(normalizer.rootPath)) {
    normalizer.rootPath = '/' + normalizer.rootPath;
  }

  return normalizer;
};
