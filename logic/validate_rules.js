const validate = {
    initial_rules: validate_initial_rules,
    additional_rules: validate_additional_rules,
    specific_rule: {
        blueprint: validate_blueprint,
        max_length: validate_max_length,
        initial_chars: validate_initial_chars,
    },
};

module.exports = { validate };

function validate_initial_rules(rules) {
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

    validate_the_rules(rules);

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

function validate_additional_rules(rules) {
    validate_the_rules(rules);

    return rules;
}

function validate_the_rules(rules) {
    if (rules.hasOwnProperty('blueprint')) validate_blueprint(rules.blueprint);
    if (rules.hasOwnProperty('max_length')) validate_max_length(rules.max_length);
    if (rules.hasOwnProperty('initial_chars'))
        validate_initial_chars(rules.initial_chars);
}

function validate_blueprint(blueprint) {
    if (typeof blueprint !== 'object' || Array.isArray(blueprint) || blueprint === null)
        throw new TypeError('the blueprint rule should be an object');
    if (Object.entries(blueprint).length === 0)
        throw new SyntaxError('the blueprint rule should not be empty');
}

function validate_max_length(max_length) {}

function validate_initial_chars(initial_chars) {}

// TODO: validation of individual rules
