const word_fabricator_config = require('..');

// word_fabricator_config();
// word_fabricator_config({});
// word_fabricator_config(10);
// word_fabricator_config('invalid');
const word_fabricator = word_fabricator_config({
    blueprint: {
        a: ['r', 'rr', 's'],
        e: ['r', 's', 'ss'],
        r: ['a', 'e'],
        rr: ['a', 'e'],
        s: ['r'],
        ss: ['a', 'e'],
    },
    hello: '',
    max_length: 1,
    initial_chars: ['a', 'e', 'r', 's'],
});
// const word_fabricator = word_fabricator_config({
//     blueprint: {
//         a: ['r', 'rr', 's'],
//         e: ['r', 's', 'ss'],
//         r: ['a', 'e'],
//         rr: ['a', 'e'],
//         s: ['r'],
//         ss: ['a', 'e'],
//     },
//     max_length: 1,
//     initial_chars: ['a', 'e', 'r', 's'],
// });

// const fabricated_words = word_fabricator();

// console.log(fabricated_words.join(', '));
