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
                test('Validation error has a message property', () => {
                    expect(initial_rules_validator(variable)).toHaveProperty('message');
                });
                test('Validation error message is a string', () => {
                    expect(
                        typeof initial_rules_validator(variable).message === 'string'
                    ).toBe(true);
                });
                test(`Validation error message contains ${description}`, () => {
                    expect(initial_rules_validator(variable).message).toContain(
                        description
                    );
                });
            });
        });
    });
});

describe('additional_rules_validator', () => {
    it('is callable with nothing', () => {
        additional_rules_validator();
    });
    it('returns null when additional_rules contains valid required rules', () => {
        expect(
            additional_rules_validator({
                blueprint: { a: 'a' },
                max_length: 3,
                initial_chars: ['a'],
            })
        ).toBeNull();
    });

    it('returns null when additional_rules is undefined', () => {
        expect(additional_rules_validator()).toBeNull();
        expect(additional_rules_validator(undefined)).toBeNull();
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
                test('Validation error has a message property', () => {
                    expect(additional_rules_validator(variable)).toHaveProperty(
                        'message'
                    );
                });
                test('Validation error message is a string', () => {
                    expect(
                        typeof additional_rules_validator(variable).message === 'string'
                    ).toBe(true);
                });
                test(`Validation error message contains ${description}`, () => {
                    expect(additional_rules_validator(variable).message).toContain(
                        description
                    );
                });
            });
        });
    });
});
