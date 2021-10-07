const configure_word_fabricator = require('./configure');

describe('configure_word_fabricator', () => {
    it('throws an error when initial_rules is empty', () => {
        expect(() => configure_word_fabricator()).toThrow();
    });
});

describe('word_fabricator', () => {
    const word_fabricator = configure_word_fabricator({
        blueprint: {
            a: ['r', 'rr', 's'],
            e: ['r', 's', 'ss'],
            r: ['a', 'e'],
            rr: ['a', 'e'],
            s: ['r'],
            ss: ['a', 'e'],
        },
        max_length: 1,
        initial_chars: ['a', 'e', 'r', 's'],
    });

    it('throws an error when additional rules is a string', () => {
        expect(() => word_fabricator('a string')).toThrow();
    });
});
