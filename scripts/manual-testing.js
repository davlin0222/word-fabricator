const word_fabricator_config = require('..');

// word_fabricator_config();
// word_fabricator_config(null);
// word_fabricator_config(10);
// word_fabricator_config('invalid');
// word_fabricator_config(new Set());
// word_fabricator_config({});
// word_fabricator_config({
// invalid_rule_one: '',
// invalid_rule_two: '',
// invalid_rule_three: '',
// invalid_rule_four: '',
// });

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

console.log(fabricated_words.join(', '));
