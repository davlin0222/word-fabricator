const { and_list } = require('./utils/helpers');

module.exports = individual_rule_validator;

function individual_rule_validator(rule_collection, rule_collection_validation_error) {
    const implemented_rules = ['blueprint', 'max_length', 'initial_chars'];

    const rule_collection_not_implemented_rules = Object.keys(rule_collection).reduce(
        (previous_rules, rule) => {
            if (implemented_rules.includes(rule)) {
                return previous_rules;
            }
            return [...previous_rules, "'" + rule + "'"];
        },
        []
    );

    if (rule_collection_not_implemented_rules.length !== 0) {
        return rule_collection_validation_error(
            `contains ${and_list(rule_collection_not_implemented_rules)}, ${
                rule_collection_not_implemented_rules.length > 1
                    ? 'which are not implemented rules'
                    : 'which is not an implemented rule'
            }`
        );
    }

    // const {blueprint, max_length, initial_chars} = rule_collection;

    // if (validate_blueprint(blueprint)) {
    //     return
    // }
}

// function blueprint_validator() {}
