const {
    initial_rules_validator,
    additional_rules_validator,
} = require('./rule_validator');

const validation_error = require('./validation_error');
jest.mock('./validation_error.js', () => jest.fn(() => true));

afterEach(() => {
    validation_error.mockClear();
});

describe('initial_rules_validator', () => {
    it('is callable with nothing', () => {
        initial_rules_validator();
    });

    it('returns null when initial_rules contains simplest valid required rules', () => {
        expect(
            initial_rules_validator({
                blueprint: { a: 'a' },
                max_length: 3,
                initial_chars: ['a'],
            })
        ).toBeNull();
        expect(validation_error).toHaveBeenCalledTimes(0);
    });

    it('correctly creates validation error function when initial_rules contains not implemented rules', () => {
        initial_rules_validator({
            invalid_rule_one: '',
            invalid_rule_two: '',
        });
        expect(validation_error).toHaveBeenCalledWith(
            "The provided initial_rules contains 'invalid_rule_one' and 'invalid_rule_two', which are not implemented rules"
        );
    });

    describe("correctly creates validation error when initial rules doesn't include", () => {
        [
            // [
            //     'blueprint, max_length and initial_chars',
            //     {
            //         length: 0,
            //     },
            // ],
            [
                "'blueprint' and 'max_length'",
                {
                    initial_chars: ['a'],
                },
            ],
            [
                "'blueprint'",
                {
                    max_length: 3,
                },
            ],
            [
                "'max_length'",
                {
                    blueprint: { a: 'a' },
                },
            ],
            [
                "'max_length'",
                {
                    blueprint: { a: 'a' },
                    initial_chars: ['a'],
                },
            ],
        ].forEach(([substring, variable]) => {
            test(`${substring} - ${require('util').inspect(variable)}`, () => {
                initial_rules_validator(variable);

                expect(validation_error).toHaveBeenCalledWith(
                    expect.stringContaining(substring)
                );
            });
        });
    });

    describe('correctly creates validation error when initial rules is', () => {
        [
            ['undefined', undefined],
            ['null', null],
            ['not an object', 10],
            ['not an object', 'string'],
            ['not a plain object', [1, 2, 3]],
            ['not a plain object', new Set()],
            ['an empty plain object', {}],
        ].forEach(([substring, variable]) => {
            test(`${substring} - ${require('util').inspect(variable)}`, () => {
                initial_rules_validator(variable);

                expect(validation_error).toHaveBeenCalledWith(
                    expect.stringContaining(substring)
                );
            });
        });
    });
});

describe('additional_rules_validator', () => {
    it('is callable with nothing', () => {
        additional_rules_validator();
    });

    it('returns null when additional_rules is undefined', () => {
        expect(additional_rules_validator()).toBeNull();
        expect(additional_rules_validator(undefined)).toBeNull();
    });

    it('returns null when additional_rules contains simplest valid required rules', () => {
        expect(
            additional_rules_validator({
                blueprint: { a: 'a' },
                max_length: 3,
                initial_chars: ['a'],
            })
        ).toBeNull();
        expect(validation_error).toHaveBeenCalledTimes(0);
    });

    it('correctly creates validation error function when additional_rules contains not implemented rules', () => {
        additional_rules_validator({
            invalid_rule_one: '',
            invalid_rule_two: '',
        });
        expect(validation_error).toHaveBeenCalledWith(
            "The provided additional_rules contains 'invalid_rule_one' and 'invalid_rule_two', which are not implemented rules"
        );
    });

    describe('correctly creates validation error when initial rules is', () => {
        [
            // ['undefined', undefined],
            ['null', null],
            ['not an object', 10],
            ['not an object', 'string'],
            ['not a plain object', [1, 2, 3]],
            ['not a plain object', new Set()],
            ['an empty plain object', {}],
        ].forEach(([substring, variable]) => {
            test(`${substring} - ${require('util').inspect(variable)}`, () => {
                additional_rules_validator(variable);

                expect(validation_error).toHaveBeenCalledWith(
                    expect.stringContaining(substring)
                );
            });
        });
    });
});
