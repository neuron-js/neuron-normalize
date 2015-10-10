'use strict';

var expect = require('chai').expect;
var neuron_normalize = require('../');
var path = require('path');

var result, normalizer;

describe('parse function', function(){
  beforeEach(function(){
      normalizer = neuron_normalize();
  });
  describe('parse fullfilled id \'zepto@1.1.0/lib/zepto.js\'', function(){
    beforeEach(function(){
      result = normalizer.parse('zepto@1.1.0/lib/zepto.js');
    });

    it('should return a object which property \'version\' equals \'1.1.0\'', function() {
      expect(result.version).to.equal('1.1.0');
    });

    it('should return a object which property \'path\' equals \'/lib/zepto.js\'', function() {
      expect(result.path).to.equal('/lib/zepto.js');
    });

    it('should return a object which property \'package_name\' equals \'zepto\'', function() {
      expect(result.package_name).to.equal('zepto');
    });

    it('should return a object which property \'package\' equals \'zepto@1.1.0\'', function() {
      expect(result.package).to.equal('zepto@1.1.0');
    });

    it('should return a object which property \'id\' equals \'zepto@1.1.0/lib/zepto.js\'', function() {
      expect(result.id).to.equal('zepto@1.1.0/lib/zepto.js');
    });
  });

  describe('parse id \'zepto@1.1.0\'', function(){
    beforeEach(function(){
      result = normalizer.parse('zepto@1.1.0');
    });

    it('should return a object which property \'version\' equals \'1.1.0\'', function() {
      expect(result.version).to.equal('1.1.0');
    });

    it('should return a object which property \'path\' equals \'/zepto.js\'', function() {
      expect(result.path).to.equal('/zepto.js');
    });

    it('should return a object which property \'package_name\' equals \'zepto\'', function() {
      expect(result.package_name).to.equal('zepto');
    });

    it('should return a object which property \'package\' equals \'zepto@1.1.0\'', function() {
      expect(result.package).to.equal('zepto@1.1.0');
    });

    it('should return a object which property \'id\' equals \'zepto@1.1.0/zepto.js\'', function() {
      expect(result.id).to.equal('zepto@1.1.0/zepto.js');
    });
  });

  describe('parse id \'zepto\'', function(){
    beforeEach(function(){
      result = normalizer.parse('zepto');
    });

    it('should return a object which property \'version\' equals \'*\'', function() {
      expect(result.version).to.equal('*');
    });

    it('should return a object which property \'path\' equals \'/zepto.js\'', function() {
      expect(result.path).to.equal('/zepto.js');
    });

    it('should return a object which property \'package_name\' equals \'zepto\'', function() {
      expect(result.package_name).to.equal('zepto');
    });

    it('should return a object which property \'package\' equals \'zepto@*\'', function() {
      expect(result.package).to.equal('zepto@*');
    });

    it('should return a object which property \'id\' equals \'zepto@*/zepto.js\'', function() {
      expect(result.id).to.equal('zepto@*/zepto.js');
    });
  });

  describe('parse id \'zepto/lib/zepto.js\'', function(){
    beforeEach(function(){
      result = normalizer.parse('zepto/lib/zepto.js');
    });

    it('should return a object which property \'version\' equals \'*\'', function() {
      expect(result.version).to.equal('*');
    });

    it('should return a object which property \'path\' equals \'/lib/zepto.js\'', function() {
      expect(result.path).to.equal('/lib/zepto.js');
    });

    it('should return a object which property \'package_name\' equals \'zepto\'', function() {
      expect(result.package_name).to.equal('zepto');
    });

    it('should return a object which property \'package\' equals \'zepto@*\'', function() {
      expect(result.package).to.equal('zepto@*');
    });

    it('should return a object which property \'id\' equals \'zepto@*/lib/zepto.js\'', function() {
      expect(result.id).to.equal('zepto@*/lib/zepto.js');
    });
  });
});

describe('id_to_url function', function() {
  describe('transform a id \'zepto@1.0.0/lib/zepto.js\' with a root \'/path/to/work/\'', function() {
    var id = 'zepto@1.0.0/lib/zepto.js';
    beforeEach(function(){
      normalizer = neuron_normalize({root: '/path/to/work'});
    });

    it('should return a url string equals to \'/path/to/work/zepto/1.0.0/lib/zepto.js\'', function() {
      expect(normalizer.to_url(id)).to.equal('/path/to/work/zepto/1.0.0/lib/zepto.js');
    });
  });

  describe('transform a id \'zepto\' with a default root\'/\'', function() {
    var id = 'zepto';
    beforeEach(function(){
      normalizer = neuron_normalize();
    });

    it('should return a url string equals to \'/zepto/*/zepto.js\'', function() {
      expect(normalizer.to_url(id)).to.equal(path.join('/', '/zepto/*/zepto.js'));
    });
  });
});

describe('url_to_package function', function() {
  describe('transform a path \'/mod/zepto/*/zepto.js\' with a root \'/mod\'', function() {
    beforeEach(function(){
      normalizer = neuron_normalize({root: '/mod'});
      result = normalizer.to_package('/mod/zepto/*/zepto.js');
    });

    it('should return a object with property \'version\' equals to \'*\'', function() {
      expect(result.version).to.equal('*');
    });

    it('should return a object with property \'pacakge_name\' equals to \'zepto\'', function() {
      expect(result.package_name).to.equal('zepto');
    });

    it('should return a object with property \'path\' equals to \'/zepto.js\'', function() {
      expect(result.path).to.equal('/zepto.js');
    });

    it('should return a object with property \'package\' equals to \'zepto@*\'', function() {
      expect(result.package).to.equal('zepto@*');
    });

    it('should return a object with property \'id\' equals to \'zepto@*/zepto.js\'', function() {
      expect(result.id).to.equal('zepto@*/zepto.js');
    });
  });

  describe('transform a path \'/mod/zepto/*/zepto.js\' with a root \'mod\'', function() {
    beforeEach(function(){
      normalizer = neuron_normalize({root: 'mod'});
      result = normalizer.to_package('/mod/zepto/*/zepto.js');
    });

    it('should return a object with property \'version\' equals to \'*\'', function() {
      expect(result.version).to.equal('*');
    });

    it('should return a object with property \'pacakge_name\' equals to \'zepto\'', function() {
      expect(result.package_name).to.equal('zepto');
    });

    it('should return a object with property \'path\' equals to \'/zepto.js\'', function() {
      expect(result.path).to.equal('/zepto.js');
    });

    it('should return a object with property \'package\' equals to \'zepto@*\'', function() {
      expect(result.package).to.equal('zepto@*');
    });

    it('should return a object with property \'id\' equals to \'zepto@*/zepto.js\'', function() {
      expect(result.id).to.equal('zepto@*/zepto.js');
    });
  });
});
