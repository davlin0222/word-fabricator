# Word Fabricator

Generate fictional words by specifying rules

```js
const fictional_words = word_fabricator({
    blueprint: {
        a: ['r', 'rr', 's'],
        e: ['r', 's', 'ss'],
        r: ['a', 'e'],
        rr: ['a', 'e'],
        s: ['a', 'e'],
        s: ['r'],
        ss: ['a', 'e'],
    },
    max_length: 4,
    initial_chars: ['a', 'e', 'r', 's'],
})();

console.log(fictional_words.join(', '));

/* a, ar, ara, arar, aras, are, arer, ares, arr, arra, arre, as, asr, asra, asre, e, er, era, erar, eras, ere, erer, eres, es, esr, esra, esre, ess, essa, esse, r, ra, rar, rara, rare, rarr, ras, rasr, re, rer, rera, rere, res, resr, ress, s, sr, sra, srar, sras, sre, srer, sres */
```
