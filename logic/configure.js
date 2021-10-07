const {
    initial_rules_validator,
    additional_rules_validator,
} = require('./rule_validator');

module.exports = configure_word_fabricator;

/**
 * configure_word_fabricator
 * @param {Object.<string, Object>} initial_rules a plain object which must contain at least the required rules
 * @returns {function} the word_fabricator function
 */
function configure_word_fabricator(initial_rules) {
    //
    const validation_error = initial_rules_validator(initial_rules);
    if (validation_error) {
        console.log(validation_error.message);
        process.exit(1);
        return () => [];
    }

    return word_fabricator;

    /**
     * word_fabricator
     * @param {Object.<string, Object>} additional_rules undefined or a plain object which will add new rules and override predefined rules
     * @returns {string[]} an array of strings
     */
    function word_fabricator(additional_rules) {
        //
        const validation_error = additional_rules_validator(additional_rules);
        if (validation_error) {
            console.log(validation_error.message);
            return [];
        }

        const rules = { ...initial_rules, ...additional_rules };
        const { blueprint, max_length, initial_chars } = rules;
        const initial_parts = initial_chars;

        const fabricate_words = require('./fabricate_words');
        return fabricate_words(blueprint, max_length, initial_parts);
    }
}