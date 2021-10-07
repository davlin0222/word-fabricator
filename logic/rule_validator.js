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
    // if(initial_rules.hasOwnProperty('blueprint'))
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
    if (typeof rule_collection === 'undefined') {
        return {
            message: `the provided ${rule_collection_name} is undefined`,
            error: new Error(),
        };
    }
    if (typeof rule_collection !== 'object') {
        return {
            message: `the provided ${rule_collection_name} is not an object`,
            error: new Error(),
        };
    }
    if (rule_collection === null) {
        return {
            message: `the provided ${rule_collection_name} is null`,
            error: new Error(),
        };
    }
    if (rule_collection.toString() !== '[object Object]') {
        return {
            message: `the provided ${rule_collection_name} is not a plain object`,
            error: new Error(),
        };
    }
    if (Object.keys(rule_collection).length === 0) {
        return {
            message: `the provided ${rule_collection_name} is an empty plain object`,
            error: new Error(),
        };
    }
    return null;
}
