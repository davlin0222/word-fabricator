const fabricate_words = require('./logic/fabricate_words');

module.exports = word_fabricator;

function word_fabricator(initial_rules) {
    if (!initial_rules) return null;
    const { blueprint, max_length, initial_parts } = initial_rules;
    return fabricate_words(blueprint, max_length, initial_parts);
}
