const word_fabricator_config = require('..');

const word_fabricator = word_fabricator_config({
    blueprint: {
        a: ['r', 'rr', 's'],
        e: ['r', 's', 'ss'],
        r: ['a', 'e'],
        rr: ['a', 'e'],
        s: ['r'],
        ss: ['a', 'e'],
    },
    max_length: 1,
    initial_chars: ['a', 'e', 'r', 's'],
});

const fabricated_words = word_fabricator();

console.log(fabricated_words.join(', '));
