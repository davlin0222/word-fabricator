# Word Fabricator

Generate fictional words by specifying rules

<br>

```js
const word_fabricator = require('word-fabricator');

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

// a, ar, ara, arar, aras, are, arer, ares,
// arr, arra, arre, as, asr, asra, asre,
// e, er, era, erar, eras, ere, erer, eres,
// es, esr, esra, esre, ess, essa, esse,
// r, ra, rar, rara, rare, rarr, ras, rasr,
// re, rer, rera, rere, res, resr, ress,
// s, sr, sra, srar, sras, sre, srer, sres
```
[code from _demo/usage.js_](./demo/usage.js)
<br>
<br>

# Rules
\* Required as initial rule

## blueprint *

An object where the values is an array of all letters which are allowed to follow the letter to the left (the object key).

## max_length *

The maximum word length word-fabricator will try to make the words before going to the next one.

## initial_chars *

An array of the first letter combinations allowed to be the beginning of a word.
[code from _demo/usage.js_](./demo/usage.js)
