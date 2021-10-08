const { object_map } = require('./helpers');

module.exports = { guard, Guard: guard };

function guard(variable) {
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
