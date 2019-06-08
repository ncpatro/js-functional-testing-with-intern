const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');

const { toYMD } = require('../../src/js/util/date.js');

registerSuite('/src/js/util/date', {
    toYMD: {
        'formats date correctly'() {
            const date = new Date('3/19/2006');
            const actual = toYMD(date);

            assert.strictEqual(actual, '2006-03-19');
        }
    }
});