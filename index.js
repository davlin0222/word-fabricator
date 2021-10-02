const { validate } = require('./logic/validate_rules');
const { fabricate_words } = require('./logic/fabricate_words');

module.exports = word_fabricator_config;

function word_fabricator_config(initial_rules) {
    const valid_initial_rules = validate.initial_rules(initial_rules);

    return function word_fabricator(additional_rules) {
        const valid_additional_rules = validate.additional_rules(additional_rules);
        const valid_rules = { ...valid_initial_rules, ...valid_additional_rules };

        const { blueprint, max_length, initial_chars } = valid_rules;
        const initial_parts = initial_chars;

        return fabricate_words(blueprint, max_length, initial_parts);
    };
}
