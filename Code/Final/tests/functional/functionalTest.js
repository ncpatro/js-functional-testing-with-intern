const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');

const { keys } = require('@theintern/leadfoot');

registerSuite('Functional Tests', {
    'App name should be right'() {
        return this.remote
            .get('http://localhost:8080')
            .findByTagName('h1')
                .getVisibleText()
                .then((text) => {
                    assert.strictEqual(text, 'JS Meetup Expense Report');
                });
    },'calculate expense correctly'() {
        const amounts = [ 10, 20 ];
        return this.remote
            .get('http://localhost:8080')
            .findByCssSelector('table .item')
                .findByCssSelector('.input-amount')
                    .pressKeys([keys.COMMAND, 'a'])
                    .type('10')
                .end()
            .end()
            .then(addRow())
            .findByCssSelector('table .item:nth-child(2)')
                .findByCssSelector('.input-amount')
                    .pressKeys([keys.COMMAND, 'a'])
                    .type('20')
                    .type(keys.TAB)
                .end()
            .end()
            .findByCssSelector('tfoot .sum')
                .getVisibleText()
                .then((text) => {
                    assert.strictEqual(text, '30.00');
                });
    }
});

function addRow() {
    return function() {
        return this.parent
        .findByCssSelector('thead button')
            .click()
        .end();
    };
}