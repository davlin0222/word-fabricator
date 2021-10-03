const fabricate_words = require('../logic/fabricate_words');

const fabricated_words = fabricate_words(
    {
        a: ['r', 'rr', 's'],
        e: ['r', 's', 'ss'],
        r: ['a', 'e'],
        rr: ['a', 'e'],
        s: ['r'],
        ss: ['a', 'e'],
    },
    2,
    ['a', 'e', 'r', 's']
);

console.log(fabricated_words.join(', '));
