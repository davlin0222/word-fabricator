const validate = {
    initial_rules,
    additional_rules,
    general_rules,
};

module.exports = { validate };

function initial_rules(rules) {
    if (typeof rules !== 'object' || Array.isArray(rules) || rules === null)
        throw new TypeError('initial_rules should be an object');
    if (Object.entries(rules).length === 0)
        throw new SyntaxError('initial_rules should not be empty');
    return rules;
}

function additional_rules(rules) {
    return general_rules(rules);
}

function general_rules(rules) {
    return rules;
}

// TODO: validation of individual rules
