const { Guard } = require('./utils/guard');
const { and_list } = require('./utils/helpers');

const validate = {
    blueprint,
    max_length,
    initial_chars,
};

module.exports = { each_rule_validator, single_rule_validator, validate };

function blueprint(variable) {
    const blueprint_guard = new Guard(variable);

    if (blueprint_guard.is.undefined()) {
        return 'is undefined';
    }

    if (blueprint_guard.is.null()) {
        return 'is null';
    }

    if (blueprint_guard.is.not.object()) {
        return 'is not an object';
    }

    if (blueprint_guard.is.not.plain_object()) {
        return 'is not a plain object';
    }

    if (blueprint_guard.is.empty()) {
        return 'is empty plain object';
    }

    return null;
}

function max_length(variable) {
    const max_length_guard = new Guard(variable);

    if (max_length_guard.is.undefined()) {
        return 'is undefined';
    }

    if (max_length_guard.is.null()) {
        return 'is null';
    }

    if (max_length_guard.is.not.number()) {
        return 'is not a number';
    }

    if (max_length_guard.is.not.integer()) {
        return 'is not an integer';
    }

    if (variable < 0) {
        return 'is less than zero';
    }

    return null;
}

function initial_chars(variable) {
    const initial_chars_guard = new Guard(variable);

    if (initial_chars_guard.is.undefined()) {
        return 'is undefined';
    }

    if (initial_chars_guard.is.null()) {
        return 'is null';
    }

    if (initial_chars_guard.is.not.object()) {
        return 'is not an object';
    }

    if (initial_chars_guard.is.not.array()) {
        return 'is not an array';
    }

    if (initial_chars_guard.is.empty()) {
        return 'is an empty array';
    }

    if (initial_chars_guard.is.not.array_of.strings()) {
        return 'is not an array of strings';
    }

    return null;
}

const implemented_rules = Object.keys(validate);

function each_rule_validator(rule_collection, rule_collection_validation_error) {
    const not_implemented_rules_validation_error = not_implemented_rules_validator(
        rule_collection,
        rule_collection_validation_error
    );
    if (not_implemented_rules_validation_error) {
        return not_implemented_rules_validation_error;
    }

    const invalid_rules_messages = Object.keys(rule_collection).reduce(
        (previous_rules_messages, rule_name) => {
            const rule_validation_message = single_rule_validator(
                rule_name,
                rule_collection[rule_name]
            );
            if (rule_validation_message)
                return [
                    ...previous_rules_messages,
                    "'" + rule_name + "' " + rule_validation_message,
                ];
            return previous_rules_messages;
        },
        []
    );

    if (invalid_rules_messages.length !== 0) {
        return rule_collection_validation_error(
            `contains invalid ${
                invalid_rules_messages.length > 1 ? 'rules' : 'rule'
            }:\n - ${invalid_rules_messages.join('\n - ')}`
        );
    }

    return null;
}

function not_implemented_rules_validator(
    rule_collection,
    rule_collection_validation_error
) {
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

    return null;
}

function single_rule_validator(rule_name, rule_value) {
    const error_message = validate[rule_name](rule_value);

    if (error_message) {
        return error_message;
    }

    return null;
}
