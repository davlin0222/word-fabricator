const {
    initial_rules_validator,
    additional_rules_validator,
} = require('./rule_validator');

describe('initial_rules_validator', () => {
    it('is callable with nothing', () => {
        initial_rules_validator();
    });
    it('returns null when initial_rules contains valid required rules', () => {
        expect(
            initial_rules_validator({
                blueprint: { a: 'a' },
                max_length: 3,
                initial_chars: ['a'],
            })
        ).toBeNull();
    });

    it('returns validation error when initial_rules has not existing rules', () => {
        expect(
            initial_rules_validator({
                an_invalid_rule: '',
            })
        ).toContain('an_invalid_rule');
    });

    describe("returns a validation error object when initial rules doesn't include", () => {
        [
            // [
            //     'blueprint, max_length and initial_chars',
            //     {
            //         length: 0,
            //     },
            // ],
            [
                'blueprint and max_length',
                {
                    initial_chars: ['a'],
                },
            ],
            [
                'blueprint and initial_chars',
                {
                    max_length: 3,
                },
            ],
            [
                'blueprint',
                {
                    max_length: 3,
                    initial_chars: ['a'],
                },
            ],
            [
                'max_length and initial_chars',
                {
                    blueprint: { a: 'a' },
                },
            ],
            [
                'max_length',
                {
                    blueprint: { a: 'a' },
                    initial_chars: ['a'],
                },
            ],
            [
                'initial_chars',
                {
                    blueprint: { a: 'a' },
                    max_length: 3,
                },
            ],
        ].forEach(([description, variable]) => {
            describe(`${require('util').inspect(variable)} - ${description}`, () => {
                test('Validation error message is a string', () => {
                    expect(typeof initial_rules_validator(variable) === 'string').toBe(
                        true
                    );
                });
                test(`Validation error message contains initial_rules`, () => {
                    expect(initial_rules_validator(variable)).toContain('initial_rules');
                });
                test(`Validation error message contains ${description}`, () => {
                    expect(initial_rules_validator(variable)).toContain(description);
                });
            });
        });
    });

    describe('returns a validation error object when initial rules is', () => {
        [
            ['not an object', 10],
            ['not an object', 'string'],
            ['not a plain object', [1, 2, 3]],
            ['not a plain object', new Set()],
            ['an empty plain object', {}],
            ['null', null],
            ['undefined', undefined],
        ].forEach(([description, variable]) => {
            describe(`${require('util').inspect(variable)} - ${description}`, () => {
                test('Validation error message is a string', () => {
                    expect(typeof initial_rules_validator(variable) === 'string').toBe(
                        true
                    );
                });
                test(`Validation error message contains initial_rules`, () => {
                    expect(initial_rules_validator(variable)).toContain('initial_rules');
                });
                test(`Validation error message contains ${description}`, () => {
                    expect(initial_rules_validator(variable)).toContain(description);
                });
            });
        });
    });
});

describe('additional_rules_validator', () => {
    it('is callable with nothing', () => {
        additional_rules_validator();
    });
    it('returns null when additional_rules contains valid rules', () => {
        expect(
            additional_rules_validator({
                max_length: 3,
            })
        ).toBeNull();
    });

    it('returns null when additional_rules is undefined', () => {
        expect(additional_rules_validator()).toBeNull();
        expect(additional_rules_validator(undefined)).toBeNull();
    });

    it('returns validation error when additional_rules has not existing rules', () => {
        expect(
            additional_rules_validator({
                an_invalid_rule: '',
            })
        ).toContain("'an_invalid_rule'");
    });

    describe('returns a validation error object when initial rules is', () => {
        [
            ['not an object', 10],
            ['not an object', 'string'],
            ['not a plain object', [1, 2, 3]],
            ['not a plain object', new Set()],
            ['an empty plain object', {}],
            ['null', null],
        ].forEach(([description, variable]) => {
            describe(`${require('util').inspect(variable)} - ${description}`, () => {
                test('Validation error message is a string', () => {
                    expect(typeof additional_rules_validator(variable) === 'string').toBe(
                        true
                    );
                });
                test(`Validation error message contains additional_rules`, () => {
                    expect(additional_rules_validator(variable)).toContain(
                        'additional_rules'
                    );
                });
                test(`Validation error message contains ${description}`, () => {
                    expect(additional_rules_validator(variable)).toContain(description);
                });
            });
        });
    });
});
