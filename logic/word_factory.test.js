const word_factory = require('./word_factory');

describe('word_factory', () => {
    it('returns segment_groups when max_length == 1', () => {
        expect(
            word_factory(
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
            word_factory(
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

    it('returns segment_groups when blueprint has dead end', () => {
        expect(
            word_factory(
                {
                    a: ['b'],
                    b: [],
                },
                5,
                ['a', 'b']
            )
        ).toEqual(['a', 'ab', 'b']);
        expect(
            word_factory(
                {
                    a: ['b', 'c'],
                    b: ['c'],
                    c: [],
                },
                5,
                ['a', 'b', 'c']
            )
        ).toEqual(['a', 'ab', 'abc', 'ac', 'b', 'bc', 'c']);
    });

    it('returns segment_groups when initial_parts includes multi letter segment', () => {
        expect(
            word_factory(
                {
                    a: ['r', 'rr', 's', 'ss'],
                    ae: ['r', 'rr', 's', 'ss'],
                    e: ['r', 'rr', 's', 'ss'],
                    r: ['a', 'e'],
                    rr: ['a', 'e'],
                    s: ['a', 'e'],
                    ss: ['a', 'e'],
                },
                3,
                ['ae', 's']
            )
        ).toEqual(['ae', 'aer', 'aes', 's', 'sa', 'sar', 'sas', 'se', 'ser', 'ses']);
    });
});
