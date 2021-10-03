const fabricate_words = require('./logic/fabricate_words');

module.exports = word_fabricator_config;

/**
 * word_fabricator_config
 * @param {Object.<string, Object>} initial_rules a plain object which must contain at least the required rules
 * @returns {function} the word_fabricator function
 */
function word_fabricator_config(initial_rules) {
    return word_fabricator;

    /**
     * word_fabricator
     * @param {Object.<string, Object>} additional_rules undefined or a plain object which will add new rules and override predefined rules
     * @returns {string[]} an array of strings
     */
    function word_fabricator(additional_rules) {
        const rules = { ...initial_rules, ...additional_rules };

        const { blueprint, max_length, initial_chars } = rules;
        const initial_parts = initial_chars;

        return fabricate_words(blueprint, max_length, initial_parts);
    }
}
