'use strict';

var expect = require('chai').expect;
var neuron_normalize = require('../');

describe('parse function', function(){
  var result;
  describe('parse fullfilled id \'zepto@1.1.0/lib/zepto.js\'', function(){
    beforeEach(function(){
      result = neuron_normalize.parse('zepto@1.1.0/lib/zepto.js');
    });

    it('should return a object which attribute \'version\' equals \'1.1.0\'', function() {
      expect(result.version).to.equal('1.1.0');
    });

    it('should return a object which attribute \'path\' equals \'/lib/zepto.js\'', function() {
      expect(result.path).to.equal('/lib/zepto.js');
    });

    it('should return a object which attribute \'package_name\' equals \'zepto\'', function() {
      expect(result.package_name).to.equal('zepto');
    });

    it('should return a object which attribute \'package\' equals \'zepto@1.1.0\'', function() {
      expect(result.package).to.equal('zepto@1.1.0');
    });

    it('should return a object which attribute \'id\' equals \'zepto@1.1.0/lib/zepto.js\'', function() {
      expect(result.id).to.equal('zepto@1.1.0/lib/zepto.js');
    });
  });

  describe('parse id \'zepto@1.1.0\'', function(){
    beforeEach(function(){
      result = neuron_normalize.parse('zepto@1.1.0');
    });

    it('should return a object which attribute \'version\' equals \'1.1.0\'', function() {
      expect(result.version).to.equal('1.1.0');
    });

    it('should return a object which attribute \'path\' equals \'/zepto.js\'', function() {
      expect(result.path).to.equal('/zepto.js');
    });

    it('should return a object which attribute \'package_name\' equals \'zepto\'', function() {
      expect(result.package_name).to.equal('zepto');
    });

    it('should return a object which attribute \'package\' equals \'zepto@1.1.0\'', function() {
      expect(result.package).to.equal('zepto@1.1.0');
    });

    it('should return a object which attribute \'id\' equals \'zepto@1.1.0/zepto.js\'', function() {
      expect(result.id).to.equal('zepto@1.1.0/zepto.js');
    });
  });

  describe('parse id \'zepto\'', function(){
    beforeEach(function(){
      result = neuron_normalize.parse('zepto');
    });

    it('should return a object which attribute \'version\' equals \'*\'', function() {
      expect(result.version).to.equal('*');
    });

    it('should return a object which attribute \'path\' equals \'/zepto.js\'', function() {
      expect(result.path).to.equal('/zepto.js');
    });

    it('should return a object which attribute \'package_name\' equals \'zepto\'', function() {
      expect(result.package_name).to.equal('zepto');
    });

    it('should return a object which attribute \'package\' equals \'zepto@*\'', function() {
      expect(result.package).to.equal('zepto@*');
    });

    it('should return a object which attribute \'id\' equals \'zepto@*/zepto.js\'', function() {
      expect(result.id).to.equal('zepto@*/zepto.js');
    });
  });

  describe('parse id \'zepto/lib/zepto.js\'', function(){
    beforeEach(function(){
      result = neuron_normalize.parse('zepto/lib/zepto.js');
    });

    it('should return a object which attribute \'version\' equals \'*\'', function() {
      expect(result.version).to.equal('*');
    });

    it('should return a object which attribute \'path\' equals \'/lib/zepto.js\'', function() {
      expect(result.path).to.equal('/lib/zepto.js');
    });

    it('should return a object which attribute \'package_name\' equals \'zepto\'', function() {
      expect(result.package_name).to.equal('zepto');
    });

    it('should return a object which attribute \'package\' equals \'zepto@*\'', function() {
      expect(result.package).to.equal('zepto@*');
    });

    it('should return a object which attribute \'id\' equals \'zepto@*/lib/zepto.js\'', function() {
      expect(result.id).to.equal('zepto@*/lib/zepto.js');
    });
  });
});
