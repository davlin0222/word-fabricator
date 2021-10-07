module.exports = { initial_rules_validator, additional_rules_validator };

/**
 * initial_rules_validator
 * @param {Object<string, any>} initial_rules
 * @returns null or a validation_error
 */
function initial_rules_validator(initial_rules) {
    if (typeof initial_rules === 'undefined') {
        return {
            message: 'the provided initial_rules is undefined',
            error: new Error(),
        };
    }
    if (typeof initial_rules !== 'object') {
        return {
            message: 'the provided initial_rules is not an object',
            error: new Error(),
        };
    }
    if (initial_rules === null) {
        return { message: 'the provided initial_rules is null', error: new Error() };
    }
    if (initial_rules.toString() !== '[object Object]') {
        return {
            message: 'the provided initial_rules is not a plain object',
            error: new Error(),
        };
    }
    if (Object.keys(initial_rules).length === 0) {
        return {
            message: 'the provided initial_rules is an empty plain object',
            error: new Error(),
        };
    }
    return null;
}

function additional_rules_validator(additional_rules) {
    if (typeof additional_rules === 'undefined') return null;
    if (typeof additional_rules === 'undefined') {
        return {
            message: 'the provided additional_rules is undefined',
            error: new Error(),
        };
    }
    if (typeof additional_rules !== 'object') {
        return {
            message: 'the provided additional_rules is not an object',
            error: new Error(),
        };
    }
    if (additional_rules === null) {
        return { message: 'the provided additional_rules is null', error: new Error() };
    }
    if (additional_rules.toString() !== '[object Object]') {
        return {
            message: 'the provided additional_rules is not a plain object',
            error: new Error(),
        };
    }
    if (Object.keys(additional_rules).length === 0) {
        return {
            message: 'the provided additional_rules is an empty plain object',
            error: new Error(),
        };
    }
    return null;
}
