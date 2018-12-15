const {
  textToArgs
} = require('../lib/consoleParser');
const assert = require('assert');

describe('index', () => {
  it('base', () => {
    assert.deepEqual(textToArgs('ls -al'), ['ls', '-al']);
    assert.deepEqual(textToArgs('print "hello"'), ['print', 'hello']);
    assert.deepEqual(textToArgs('print "he\\"llo"'), ['print', 'he"llo']);
  });
});
