const { Guard } = require('./utils/guard');

module.exports = {
    initial_rules_validator,
    additional_rules_validator,
    rule_collection_validator,
};

/**
 * initial_rules_validator
 * @param {Object<string, any>} initial_rules is a plain object containing required rules
 * @returns null or a validation_error
 */
function initial_rules_validator(initial_rules) {
    const rule_collection_validation_error = rule_collection_validator(
        initial_rules,
        'The provided initial_rules'
    );
    if (rule_collection_validation_error) {
        return rule_collection_validation_error;
    }

    const initial_rules_guard = new Guard(initial_rules);

    const missing_required_rules = ['blueprint', 'max_length', 'initial_chars'].reduce(
        (missing_required_rules, rule) => {
            if (initial_rules_guard.has.property(rule)) {
                return missing_required_rules;
            }
            return [...missing_required_rules, rule];
        },
        []
    );

    if (missing_required_rules.length !== 0) {
        return `The provided initial_rules does not contain the required rule${
            missing_required_rules.length > 1 ? 's' : ''
        } ${and_list(missing_required_rules)}`;
    }

    return null;
}

/**
 * additional_rules_validator
 * @param {Object<string, any>|undefined} additional_rules is a plain object or undefined
 * @returns null or a validation_error
 */
function additional_rules_validator(additional_rules) {
    if (typeof additional_rules === 'undefined') return null;
    const rule_collection_validation_error = rule_collection_validator(
        additional_rules,
        'The provided additional_rules'
    );
    if (rule_collection_validation_error) {
        return rule_collection_validation_error;
    }
    return null;
}

function rule_collection_validator(rule_collection, rule_collection_name) {
    const rule_collection_guard = new Guard(rule_collection);

    const rule_validation_error = detailed_description => {
        return `${rule_collection_name} ${detailed_description}`;
    };

    if (rule_collection_guard.is.undefined()) {
        return rule_validation_error('is undefined');
    }
    if (rule_collection_guard.is.null()) {
        return rule_validation_error('is null');
    }
    if (rule_collection_guard.is.not.object()) {
        return rule_validation_error('is not an object');
    }
    if (rule_collection_guard.is.not.plain_object()) {
        return rule_validation_error('is not a plain object');
    }
    if (rule_collection_guard.is.empty()) {
        return rule_validation_error('is an empty plain object');
    }

    const allowed_rules = ['blueprint', 'max_length', 'initial_chars'];

    const not_allowed_rules = Object.keys(rule_collection).reduce(
        (not_allowed_rules, rule_name) => {
            if (allowed_rules.includes(rule_name)) {
                return not_allowed_rules;
            }
            return [...not_allowed_rules, "'" + rule_name + "'"];
        },
        []
    );

    if (not_allowed_rules.length !== 0) {
        return rule_validation_error(
            `contains ${and_list(not_allowed_rules)}, ${
                not_allowed_rules.length > 1
                    ? 'which are not implemented rules'
                    : 'which is not an implemented rule'
            } `
        );
    }

    return null;
}

function and_list(array) {
    if (array.length === 1) return '' + array[0];
    if (array.length === 2) {
        return `${array[0]} and ${array[1]}`;
    }
    return array[0] + ', ' + and_list(array.slice(1));
}
