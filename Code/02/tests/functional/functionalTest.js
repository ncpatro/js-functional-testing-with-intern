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
                .findByCssSelector('.amount input')
                    .type([keys.COMMAND, 'a'])
                    .type(amounts[0].toString())
                .end()
            .end()
            .findByCssSelector('thead button')
                .click()
            .end()
            .findByCssSelector('table .item:nth-child(2)')
                .findByCssSelector('.amount input')
                    .type([keys.COMMAND, 'a'])
                    .type(amounts[1].toString())
                    .type(keys.TAB)
                .end()
            .end()
            .findByCssSelector('tfoot .sum')
                .getVisibleText()
                .then((text) => {
                    assert.strictEqual(text, '30.00');
                });
    }
})