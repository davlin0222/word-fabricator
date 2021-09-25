const { fabricate_words } = require('../logic/fabricate_words');

const fabricated_words = fabricate_words(
    {
        a: ['r', 'rr', 's', 'ss'],
        e: ['r', 'rr', 's', 'ss'],
        r: ['a', 'e'],
        rr: ['a', 'e'],
        s: ['a', 'e'],
        ss: ['a', 'e'],
    },
    3,
    ['a', 'e', 'r', 's']
);
console.log(fabricated_words);
