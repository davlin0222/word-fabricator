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
    const rule_collection_validation_error = rule_collection_validator(initial_rules);
    if (rule_collection_validation_error) {
        return rule_collection_validation_error;
    }
    const initial_rules_guard = new Guard(initial_rules);

    if (
        initial_rules_guard.has.not.property('blueprint') &&
        initial_rules_guard.has.not.property('max_length')
    ) {
        return {
            message: "the provided initial_rules doesn't contain blueprint or max_length",
            error: new Error(),
        };
    }

    if (
        initial_rules_guard.has.not.property('blueprint') &&
        initial_rules_guard.has.not.property('initial_chars')
    ) {
        return {
            message:
                "the provided initial_rules doesn't contain blueprint or initial_chars",
            error: new Error(),
        };
    }

    if (initial_rules_guard.has.not.property('blueprint')) {
        return {
            message: "the provided initial_rules doesn't contain blueprint",
            error: new Error(),
        };
    }

    if (
        initial_rules_guard.has.not.property('max_length') &&
        initial_rules_guard.has.not.property('initial_rules')
    ) {
        return {
            message:
                "the provided initial_rules doesn't contain max_length or initial_chars",
            error: new Error(),
        };
    }

    if (initial_rules_guard.has.not.property('max_length')) {
        return {
            message: "the provided initial_rules doesn't contain max_length",
            error: new Error(),
        };
    }

    if (initial_rules_guard.has.not.property('initial_chars')) {
        return {
            message: "the provided initial_rules doesn't contain initial_chars",
            error: new Error(),
        };
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
    const rule_collection_validation_error = rule_collection_validator(additional_rules);
    if (rule_collection_validation_error) {
        return rule_collection_validation_error;
    }
    return null;
}

function rule_collection_validator(rule_collection, rule_collection_name) {
    const rule_collection_guard = new Guard(rule_collection);

    if (rule_collection_guard.is.undefined()) {
        return {
            message: `the provided ${rule_collection_name} is undefined`,
            error: new Error(),
        };
    }
    if (rule_collection_guard.is.null()) {
        return {
            message: `the provided ${rule_collection_name} is null`,
            error: new Error(),
        };
    }
    if (rule_collection_guard.is.not.object()) {
        return {
            message: `the provided ${rule_collection_name} is not an object`,
            error: new Error(),
        };
    }
    if (rule_collection_guard.is.not.plain_object()) {
        return {
            message: `the provided ${rule_collection_name} is not a plain object`,
            error: new Error(),
        };
    }
    if (rule_collection_guard.is.empty()) {
        return {
            message: `the provided ${rule_collection_name} is an empty plain object`,
            error: new Error(),
        };
    }
    return null;
}

function Guard(variable) {
    const is_predicates = {
        null: is_null,
        undefined: is_undefined,
        object: is_object,
        empty: is_empty_object,
        plain_object: is_plain_object,
    };
    const has_predicates = {
        property: has_own_property,
    };

    return {
        is: {
            not: {
                ...inverted(is_predicates),
            },
            ...is_predicates,
        },
        has: {
            not: {
                ...inverted(has_predicates),
            },
            ...has_predicates,
        },
    };

    function inverted(predicates) {
        return object_map(predicates, predicate => {
            return not(predicate);
        });
    }
    function not(predicate) {
        return (...args) => {
            return !predicate(...args);
        };
    }

    function has_own_property(key) {
        return variable.hasOwnProperty(key);
    }

    function is_null() {
        return variable === null;
    }
    function is_undefined() {
        return typeof variable === 'undefined';
    }
    function is_object() {
        return typeof variable === 'object';
    }
    function is_plain_object() {
        return variable.toString() === '[object Object]';
    }
    function is_empty_object() {
        return Object.keys(variable).length === 0;
    }
}

function object_map(object, mapFn) {
    return Object.keys(object).reduce((result, key) => {
        result[key] = mapFn(object[key]);
        return result;
    }, {});
}
