const fabricate_words = require('./fabricate_words');

describe('fabricate_words', () => {
    it('is callable', () => {
        fabricate_words();
    });
    it('return null if segment_groups is falsy', () => {
        expect(
            fabricate_words(
                {
                    a: ['r', 'rr', 's', 'ss'],
                    e: ['r', 'rr', 's', 'ss'],
                    r: ['a', 'e'],
                    rr: ['a', 'e'],
                    s: ['a', 'e'],
                    ss: ['a', 'e'],
                },
                1,
                false
            )
        ).toBeNull();
    });
    it('returns segment_groups when max_length == 1', () => {
        expect(
            fabricate_words(
                {
                    a: ['r', 'rr', 's', 'ss'],
                    e: ['r', 'rr', 's', 'ss'],
                    r: ['a', 'e'],
                    rr: ['a', 'e'],
                    s: ['a', 'e'],
                    ss: ['a', 'e'],
                },
                1,
                ['a', 'e', 'r', 's']
            )
        ).toEqual(['a', 'e', 'r', 's']);
    });

    it('returns segment_groups increased by 1 when max_length == 2', () => {
        expect(
            fabricate_words(
                {
                    a: ['r', 'rr', 's', 'ss'],
                    e: ['r', 'rr', 's', 'ss'],
                    r: ['a', 'e'],
                    rr: ['a', 'e'],
                    s: ['a', 'e'],
                    ss: ['a', 'e'],
                },
                2,
                ['a', 'e', 'r', 's']
            )
        ).toEqual(['a', 'ar', 'as', 'e', 'er', 'es', 'r', 'ra', 're', 's', 'sa', 'se']);
    });
});
