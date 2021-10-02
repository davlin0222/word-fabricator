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

    if (
        !rules.hasOwnProperty('blueprint') ||
        !rules.hasOwnProperty('max_length') ||
        !rules.hasOwnProperty('initial_chars')
    )
        throw new SyntaxError(
            `Required initial_rules ${missing_initial_rules(rules).join(' and ')} missing`
        );

    return rules;
}

function missing_initial_rules(rules) {
    if (
        !rules.hasOwnProperty('blueprint') &&
        !rules.hasOwnProperty('max_length') &&
        !rules.hasOwnProperty('initial_chars')
    )
        return ['blueprint', 'max_length', 'initial_chars'];

    if (!rules.hasOwnProperty('blueprint') && !rules.hasOwnProperty('max_length'))
        return ['blueprint', 'max_length'];
    if (!rules.hasOwnProperty('blueprint') && !rules.hasOwnProperty('initial_chars'))
        return ['blueprint', 'initial_chars'];
    if (!rules.hasOwnProperty('blueprint')) return ['blueprint'];

    if (!rules.hasOwnProperty('max_length') && !rules.hasOwnProperty('initial_chars'))
        return ['max_length', 'initial_chars'];
    if (!rules.hasOwnProperty('max_length')) return ['max_length'];

    if (!rules.hasOwnProperty('initial_chars')) return ['initial_chars'];
}

function additional_rules(rules) {
    return general_rules(rules);
}

function general_rules(rules) {
    return rules;
}

// TODO: validation of individual rules
