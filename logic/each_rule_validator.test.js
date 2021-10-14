const {
    each_rule_validator,
    single_rule_validator,
    validate,
} = require('./each_rule_validator');

describe('single_rule_validator', () => {
    it('return null when provided valid max_length', () => {
        expect(single_rule_validator('max_length', 2)).toBeNull();
    });

    it('return error message when provided invalid max_length', () => {
        expect(single_rule_validator('max_length', 'hello')).not.toBeNull();
    });
});

describe('validate.blueprint', () => {
    it('is callable with nothing', () => {
        validate.blueprint();
    });
    it('returns message when blueprint is empty plain object', () => {
        expect(validate.blueprint({})).toContain('is empty plain object');
    });
});

describe('validate.max_length', () => {
    it('is callable with nothing', () => {
        validate.max_length();
    });

    describe('return message when max_length is', () => {
        [
            ['undefined', undefined],
            ['null', null],
            ['not a number', 'string'],
            ['not an integer', 0.5],
            ['less than zero', -1],
        ].forEach(([substring, variable]) => {
            test(`${substring} - ${require('util').inspect(variable)}`, () => {
                expect(validate.max_length(variable)).toContain(substring);
            });
        });
    });
});

describe('validate.initial_chars', () => {
    it('is callable with nothing', () => {
        validate.initial_chars();
    });

    it('returns null when initial_chars is valid', () => {
        expect(validate.initial_chars(['a', 'b', 'c'])).toBeNull();
    });

    describe('return message when initial_chars is', () => {
        [
            ['undefined', undefined],
            ['null', null],
            ['not an object', 'string'],
            ['not an array', {}],
            ['not an array', new Set()],
            ['not an empty array', []],
            ['not an array of strings', ['hello', 10, {}]],
        ].forEach(([substring, variable]) => {
            test(`${substring} - ${require('util').inspect(variable)}`, () => {
                expect(validate.initial_chars(variable)).toContain(substring);
            });
        });
    });
});
