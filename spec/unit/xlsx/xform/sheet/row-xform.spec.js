'use strict';

var RowXform = require('../../../../../lib/xlsx/xform/sheet/row-xform');
var testXformHelper = require('./../test-xform-helper');

var SharedStringsXform = require('../../../../../lib/xlsx/xform/strings/shared-strings-xform');
var Enums = require('../../../../../lib/doc/enums');

var fakeStyles = {
  addStyleModel: function(style) {
    return (style && (JSON.stringify(style) != '{}')) ? 1 : 0;
  },
  getStyleModel: function(styleId) {
    return styleId ? {numFmt: '#'} : undefined;
  }
};

var fakeHyperlinkMap = {
  getHyperlink: function() {}
};

var expectations = [
  {
    title: 'Plain',
    create:  function() { return new RowXform()},
    initialModel: {number: 1, min: 1, max: 1, style: {}, cells: [{address: 'A1', type: Enums.ValueType.Number, value: 5}]},
    get preparedModel() { return this.initialModel; },
    xml: '<row r="1" spans="1:1" x14ac:dyDescent="0.25"><c r="A1"><v>5</v></c></row>',
    parsedModel: {number: 1, min: 1, max: 1, cells: [{address: 'A1', type: Enums.ValueType.Number, value: 5}]},
    get reconciledModel() { return this.initialModel; },
    tests: ['prepare', 'render', 'parse', 'reconcile'],
    options: { sharedStrings: new SharedStringsXform(), styles: fakeStyles, hyperlinkMap: fakeHyperlinkMap }
  },
  {
    title: 'Styled',
    create:  function() { return new RowXform()},
    initialModel: {number: 2, min:1, max: 1, style: {numFmt: '#'}, cells: [{address: 'A2', type: Enums.ValueType.Number, value: 5}]},
    preparedModel: {number: 2, min:1, max: 1, style: {numFmt: '#'}, cells: [{address: 'A2', type: Enums.ValueType.Number, value: 5}], styleId: 1},
    xml: '<row r="2" spans="1:1" s="1" customFormat="1" x14ac:dyDescent="0.25"><c r="A2"><v>5</v></c></row>',
    parsedModel: {number: 2, min:1, max: 1, cells: [{address: 'A2', type: Enums.ValueType.Number, value: 5}], styleId: 1},
    reconciledModel: {number: 2, min:1, max: 1, style: {numFmt: '#'}, cells: [{address: 'A2', type: Enums.ValueType.Number, value: 5}]},
    tests: ['prepare', 'render', 'parse', 'reconcile'],
    options: { sharedStrings: new SharedStringsXform(), styles: fakeStyles, hyperlinkMap: fakeHyperlinkMap }
  }
];

describe('RowXform', function () {
  testXformHelper(expectations);
});
