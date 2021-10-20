const word_fabricator_config = require('..');

// word_fabricator_config();
// word_fabricator_config(null);
// word_fabricator_config(10);
// word_fabricator_config('invalid');
// word_fabricator_config(new Set());
// word_fabricator_config({});
// word_fabricator_config({invalid_rule_one: '', invalid_rule_two: '', invalid_rule_three: '', invalid_rule_four: ''});

const word_fabricator = word_fabricator_config({
    blueprint: {
        a: ['c', 'n', 'nn', 'r', 'rr', 's'],
        e: ['c', 'n', 'nn', 'r', 'rr', 's'],
        c: ['a', 'e'],
        n: ['a', 'e'],
        nn: ['a', 'e'],
        r: ['a', 'e'],
        rr: ['a', 'e'],
        s: ['a', 'e', 'c', 'n', 'r'],
    },
    // blueprint: 'this is a string',
    max_length: 3,
    // max_length: -2,
    initial_parts: ['a', 'c', 'e', 'n', 'r', 's'],
    // initial_parts: [],
    // initial_parts: 'this is a string',
});

// word_fabricator(null);
// word_fabricator(10);
// word_fabricator('invalid');
// word_fabricator(new Set());
// word_fabricator({});
// word_fabricator({
//     invalid_rule_one: '',
//     invalid_rule_two: '',
//     invalid_rule_three: '',
//     invalid_rule_four: '',
// });

const fabricated_words = word_fabricator();

// console.log(fabricated_words.join('\n'));
console.log(fabricated_words.join(', '));

console.log(fabricated_words.length);
