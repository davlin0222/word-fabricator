const word_fabricator = require('..');

const fabricated_words = word_fabricator({
    blueprint: {
        a: ['r', 'rr', 's'],
        e: ['r', 's', 'ss'],
        r: ['a', 'e'],
        rr: ['a', 'e'],
        s: ['a', 'e'],
        s: ['r'],
        ss: ['a', 'e'],
    },
    max_length: 1,
    initial_chars: ['a', 'e', 'r', 's'],
})();

console.log(fabricated_words.join(', '));
