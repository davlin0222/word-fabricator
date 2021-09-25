const word_fabricator = require('..');

describe('word_fabricator', () => {
    it('returns segment_groups increased by 1 when max_length == 2', () => {
        expect(
            word_fabricator({
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
});
