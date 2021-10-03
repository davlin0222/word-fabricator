const fabricate_words = require('./logic/fabricate_words');

module.exports = word_fabricator_config;

function word_fabricator_config(initial_rules) {
    return function word_fabricator(additional_rules) {
        const rules = { ...initial_rules, ...additional_rules };

        const { blueprint, max_length, initial_chars } = rules;
        const initial_parts = initial_chars;

        return fabricate_words(blueprint, max_length, initial_parts);
    };
}
