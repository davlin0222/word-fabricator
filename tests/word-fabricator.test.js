const word_fabricator_config = require('..');

describe('word_fabricator', () => {
    it('returns segment_groups increased by 1 when max_length == 2', () => {
        expect(
            word_fabricator_config({
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
            })()
        ).toEqual(['a', 'ar', 'as', 'e', 'er', 'es', 'r', 'ra', 're', 's', 'sa', 'se']);
    });

    it('throws error if initial_rules is empty plain object', () => {
        expect(() => {
            word_fabricator_config({});
        }).toThrow();
    });

    it('throws error if additional_rules contains not implemented rule', () => {
        expect(() => {
            word_fabricator_config({
                blueprint: { a: ['a'] },
                max_length: 1,
                initial_chars: ['a'],
            })({ invalid: '' });
        }).toThrow();
    });

    it("throws error if initial_rules does't contain blueprint and max_length", () => {
        expect(() => {
            word_fabricator_config({
                initial_chars: ['a'],
            })();
        }).toThrow();
    });
});
