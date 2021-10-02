const { validate } = require('./validate_rules');

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

describe('validate.general_rules', () => {});
