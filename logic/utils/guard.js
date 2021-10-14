const { object_map } = require('./helpers');

module.exports = { guard, Guard: guard };

function guard(variable) {
    const is_predicates = {
        null: is_null,
        undefined: is_undefined,
        number: is_number,
        integer: is_integer,
        object: is_object,
        empty: is_empty_object,
        plain_object: is_plain_object,
        array: is_array,
    };
    const has_predicates = {
        property: has_own_property,
    };

    const predicates = {
        is: {
            not: {
                ...inverted(is_predicates),
                array_of: {
                    strings: not(is_array_of_strings),
                },
            },
            ...is_predicates,
            array_of: {
                strings: is_array_of_strings,
            },
        },
        has: {
            not: {
                ...inverted(has_predicates),
            },
            ...has_predicates,
        },
    };

    return predicates;

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
    function is_number() {
        return typeof variable === 'number';
    }
    function is_integer() {
        return Number.isInteger(variable);
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
    function is_array() {
        return Array.isArray(variable);
    }
    function is_array_of_strings() {
        if (!is_array()) return false;

        return variable.every(item => typeof item === 'string');
    }
}
