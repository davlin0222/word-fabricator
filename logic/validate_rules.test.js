const validate = require('./validate_rules');

describe('validate.initial_rules', () => {
    const valid_initial_rules = {
        blueprint: {
            a: ['r', 'rr', 's', 'ss'],
            e: ['r', 'rr', 's', 'ss'],
            r: ['a', 'e'],
            rr: ['a', 'e'],
            s: ['a', 'e'],
            ss: ['a', 'e'],
        },
        max_length: 2,
        initial_chars: ['a', 'e', 'r', 's'],
    };

    it('returns valid rules', () => {
        expect(validate.initial_rules(valid_initial_rules)).toEqual(valid_initial_rules);
    });
    it('throws if provided empty object', () => {
        expect(() => {
            validate.initial_rules({});
        }).toThrow(SyntaxError);
    });
    test.each(['string', [], [1, 2, 3], 10, null])(
        'given the non plain object %p as argument throws TypeError',
        rules => {
            expect(() => validate.initial_rules(rules)).toThrow(TypeError);
        }
    );
    describe('throws if initial_rules only includes', () => {
        test.each([
            [{ a: '' }, ['blueprint', 'max_length', 'initial_chars']],
            [{ blueprint: '' }, ['max_length', 'initial_chars']],
            [{ blueprint: '', max_length: '' }, ['initial_chars']],
            [{ blueprint: '', initial_chars: '' }, ['max_length']],
            [{ max_length: '' }, ['blueprint', 'initial_chars']],
            [{ max_length: '', initial_chars: '' }, ['blueprint']],
            [{ initial_chars: '' }, ['blueprint', 'max_length']],
        ])('%p \n\terror substrings %p', (rules, error_substrings) => {
            expect(() => validate.initial_rules(rules)).toThrow(SyntaxError);
            error_substrings.forEach(error_substring => {
                expect(() => validate.initial_rules(rules)).toThrow(error_substring);
            });
        });
    });
});

describe('validate.additional_rules', () => {
    const valid_additional_rules = {
        max_length: 2,
        initial_chars: ['a', 'e', 'r', 's'],
    };

    it('returns valid rules', () => {
        expect(validate.additional_rules(valid_additional_rules)).toEqual(
            valid_additional_rules
        );
    });
    test.each(['string', [], [1, 2, 3], 10])(
        'given the non plain object %p as argument throws TypeError',
        rules => {
            expect(() => validate.additional_rules(rules)).toThrow(TypeError);
        }
    );

    test.each([null, undefined])(
        'given %p as argumend returns empty plain object',
        rules => {
            expect(validate.additional_rules(rules)).toEqual({});
        }
    );
});

describe('validate.specific_rule.blueprint', () => {
    it('does nothing when provided valid blueprint', () => {
        expect(
            validate.specific_rule.blueprint({
                a: ['r', 'rr', 's', 'ss'],
                e: ['r', 'rr', 's', 'ss'],
                r: ['a', 'e'],
                rr: ['a', 'e'],
                s: ['a', 'e'],
                ss: ['a', 'e'],
            })
        ).toBeUndefined();
    });
    it('throws if provided empty object', () => {
        expect(() => {
            validate.specific_rule.blueprint({});
        }).toThrow(SyntaxError);
    });
    test.each(['string', [], [1, 2, 3], 10, null])(
        'given the non plain object %p as argument throws TypeError',
        rules => {
            expect(() => validate.specific_rule.blueprint(rules)).toThrow(TypeError);
        }
    );
});

describe('validate.specific_rule.max_length', () => {
    test.each(['string', [], [1, 2, 3], {}, null])(
        'given the not a number %p as argument throws TypeError',
        object => {
            expect(() => validate.specific_rule.max_length(object)).toThrow(TypeError);
        }
    );

    test.each([Infinity, 1.5, -1.1, 10 / 3])(
        'given the not an integer %p as argument throws SyntaxError',
        object => {
            expect(() => validate.specific_rule.max_length(object)).toThrow(SyntaxError);
        }
    );
});

describe('validate.specific_rule.initial_chars', () => {
    test.each(['string', 10, {}, null])(
        'given the not an array %p as argument throws TypeError',
        object => {
            expect(() => validate.specific_rule.initial_chars(object)).toThrow(TypeError);
        }
    );
    it('throws if provided empty array', () => {
        expect(() => validate.specific_rule.initial_chars([])).toThrow(SyntaxError);
    });
});
