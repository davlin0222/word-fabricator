const { Guard } = require('./utils/guard');
const { and_list } = require('./utils/helpers');

module.exports = {
    initial_rules_validator,
    additional_rules_validator,
};

/**
 * initial_rules_validator
 * @param {Object<string, any>} initial_rules is a plain object containing required rules
 * @returns null or a validation_error object
 */
function initial_rules_validator(initial_rules) {
    const rule_collection_validation_error = rule_collection_validator(
        initial_rules,
        description => {
            return `The provided initial_rules ${description}`;
        }
    );
    if (rule_collection_validation_error) {
        return rule_collection_validation_error;
    }

    const required_initial_rules_validation_error = required_rules_validator(
        initial_rules,
        ['blueprint', 'max_length', 'initial_chars'],
        missing_required_rules => {
            return `The provided initial_rules does not contain the required rule${
                missing_required_rules.length > 1 ? 's' : ''
            } ${and_list(missing_required_rules)}`;
        }
    );
    if (required_initial_rules_validation_error) {
        return required_initial_rules_validation_error;
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
        description => {
            return `The provided additional_rules ${description}`;
        }
    );
    if (rule_collection_validation_error) {
        return rule_collection_validation_error;
    }

    return null;
}

function rule_collection_validator(rule_collection, rule_collection_validation_error) {
    const rule_collection_guard = new Guard(rule_collection);

    if (rule_collection_guard.is.undefined()) {
        return rule_collection_validation_error('is undefined');
    }
    if (rule_collection_guard.is.null()) {
        return rule_collection_validation_error('is null');
    }
    if (rule_collection_guard.is.not.object()) {
        return rule_collection_validation_error('is not an object');
    }
    if (rule_collection_guard.is.not.plain_object()) {
        return rule_collection_validation_error('is not a plain object');
    }
    if (rule_collection_guard.is.empty()) {
        return rule_collection_validation_error('is an empty plain object');
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
        return rule_collection_validation_error(
            `contains ${and_list(not_allowed_rules)}, ${
                not_allowed_rules.length > 1
                    ? 'which are not implemented rules'
                    : 'which is not an implemented rule'
            } `
        );
    }

    return null;
}

function required_rules_validator(
    rule_collection,
    required_rules,
    required_rules_validation_error
) {
    const missing_required_rules = required_rules.reduce((previous_rules, rule) => {
        if (!rule_collection.hasOwnProperty(rule)) {
            return [...previous_rules, rule];
        }
        return [...previous_rules];
    }, []);

    if (missing_required_rules.length !== 0) {
        return required_rules_validation_error(missing_required_rules);
    }

    return null;
}
