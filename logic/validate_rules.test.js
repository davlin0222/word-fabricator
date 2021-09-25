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
    test.each(['string', [], [1, 2, 3], 10, null])(
        'given the non plain object %p as argument throws TypeError',
        rules => {
            expect(() => validate.initial_rules(rules)).toThrow(TypeError);
        }
    );
});

describe('validate.general_rules', () => {});
