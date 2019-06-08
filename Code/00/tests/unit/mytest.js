const {suite, test} = intern.getInterface('tdd');
const {assert} = intern.getPlugin('chai');

suite('myTests', ()=>{
    test('should pass', ()=>{
        assert.strictEqual(5,5);
    });
    test('should fail', ()=>{
        assert.strictEqual(5,4);
    })
})