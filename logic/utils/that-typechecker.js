module.exports = that;

/**
 *
 * @param {any} variable a variable of any type
 * @returns {Object} an object with the property "is"
 */
function that(variable) {
    //
    const is_obj = {
        number,
        boolean,
        bool: boolean,
        nullish,
        undefined,
        string,
        object,
        plain_object,
        pojo: plain_object,
        array,
        truthy,
        falsy,
    };

    const is = {
        a: is_obj,
        an: is_obj,
        ...is_obj,
    };
    return { is };

    function boolean() {
        if (typeof variable !== 'boolean') return false;
        return true;
    }
    function number() {
        if (typeof variable !== 'number') return false;
        if (Number.isNaN(variable)) return false;
        return true;
    }
    function nullish() {
        if (variable == null) return true;
        return false;
    }
    function undefined() {
        if (typeof variable === 'undefined') return true;
        return false;
    }
    function string() {
        if (typeof variable === 'string') return true;
        return false;
    }
    function object() {
        if (typeof variable === 'object') return true;
        return false;
    }
    function plain_object() {
        if (variable == null) return false;
        if (variable.toString() === '[object Object]') return true;
        // if (instanceof variable === 'object') return true;
        return false;
    }
    function array() {
        return Array.isArray(variable);
    }
    function truthy() {
        if (variable) return true;
        return false;
    }
    function falsy() {
        if (!variable) return true;
        return false;
    }
    // function _null(){
    //     if (variable === null) return true
    //     return false
    // }
}
