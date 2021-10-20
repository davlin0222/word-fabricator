const { validate } = require('./validator');
const word_factory = require('./word_factory');

module.exports = configure_word_fabricator;

/**
 * configure_word_fabricator
 * @param {Object.<string, Object>} initial_rules a plain object containing rules and must contain at least the required rules
 * @returns {function} the actual word_fabricator function
 */
function configure_word_fabricator(initial_rules) {
    //
    const initial_rules_validation_error = validate.initial_rules(initial_rules);
    if (initial_rules_validation_error) throw initial_rules_validation_error;

    return word_fabricator;

    /**
     * word_fabricator
     * @param {Object.<string, Object>} additional_rules undefined or a plain object of new rules as well as predefined rules to override, provided as initial_rules
     * @returns {string[]} an array of strings containing the fabricated words
     */
    function word_fabricator(additional_rules) {
        //
        const additional_rules_validation_error = validate.additional_rules(
            additional_rules
        );
        if (additional_rules_validation_error) throw additional_rules_validation_error;

        const rules = { ...initial_rules, ...additional_rules };
        const { blueprint, max_length, initial_parts } = rules;

        const words = word_factory(blueprint, max_length, initial_parts);
        return words;
    }
}
