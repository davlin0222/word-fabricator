module.exports = { object_map, and_list };

function object_map(object, mapFn) {
    return Object.keys(object).reduce((result, key) => {
        result[key] = mapFn(object[key]);
        return result;
    }, {});
}

function and_list(array) {
    if (array.length === 1) return '' + array[0];
    if (array.length === 2) {
        return `${array[0]} and ${array[1]}`;
    }
    return array[0] + ', ' + and_list(array.slice(1));
}
