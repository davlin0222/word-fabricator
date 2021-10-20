const configure_word_fabricator = require('./path/to/word-fabricator');

const word_fabricator = configure_word_fabricator({
    blueprint: {
        dr: ['ago', 'e'],
        ago: ['n'],
        n: ['e', 'ago'],
        e: ['gg'],
        gg: [],
    },
    max_length: 6,
    initial_parts: ['dr', 'ago', 'n', 'e'],
});

const fictional_words = word_fabricator();

console.log(fictional_words.join(', '));

// dr, drago, dragon, dre, dregg, ago, agon, agone, n, ne, negg, nago, nagon, nagone, e, egg
