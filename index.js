
var versionRegex = /@((?:\d\.)*\d)/;
var pathRegex = /\/(?:.*\/).*/;


/*
 * function parse
 * params:
 * @id: package id, 'zepto@1.2.0/lib/zepto.js'
 * TBD:
 * 1.config.js, neuron.js whitelist
 * 2.warnings for empty param
 */
function parse(id) {
  var versionMatches = id.match(versionRegex);
  var relativePathMatches = id.match(pathRegex);

  // var package_name = versionMatches ? id.substring(0, versionMatches.index) : (relativePathMatches ? id.substring(0, relativePathMatches.index) : id);

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
}

module.exports.parse = parse;
