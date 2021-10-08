module.exports = { object_map };

function object_map(object, mapFn) {
    return Object.keys(object).reduce((result, key) => {
        result[key] = mapFn(object[key]);
        return result;
    }, {});
}
