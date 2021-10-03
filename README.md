# Word Fabricator

Generate fictional words by specifying rules

<br>

[code from _demo/usage.js_](./demo/usage.js)

```js
const word_fabricator = require('word-fabricator');

const fictional_words = word_fabricator({
    blueprint: {
        a: ['r', 'rr', 's'],
        e: ['r', 's', 'ss'],
        r: ['a', 'e'],
        rr: ['a', 'e'],
        s: ['r'],
        ss: ['a', 'e'],
    },
    max_length: 4,
    initial_chars: ['a', 'e', 'r', 's'],
})();

console.log(fictional_words.join(', '));

// Output:

// a, ar, ara, arar, aras, are, arer, ares,
// arr, arra, arre, as, asr, asra, asre,
// e, er, era, erar, eras, ere, erer, eres,
// es, esr, esra, esre, ess, essa, esse,
// r, ra, rar, rara, rare, rarr, ras, rasr,
// re, rer, rera, rere, res, resr, ress,
// s, sr, sra, srar, sras, sre, srer, sres
```

<br>
<br>

# Getting started

## How to install

```bash
npm install word-fabricator --save
```

<br>

## How to use

---

### `require('word-fabricator')`

Returns a function to configure the word-fabricator

```js
const word_fabricator_config = require('word-fabricator');
```

---

### `word_fabricator_config`

This function requires some initial rules and returns the actual `word_fabricator`

```js
const word_fabricator = word_fabricator_config(initial_rules);
```

#### `initial_rules`

This plain object must include the required rules; [`blueprint`](#blueprint), [`max_length`](#max_length) and [`initial_chars`](#initial_chars) - [The rules](#the-rules)

---

### `word_fabricator`

Returns the array of fictional words which are fabricated using the provided rules (both as initial rules and additional rules)

```js
const words = word_fabricator();
// or
const words = word_fabricator(additional_rules);
```

#### `additional_rules`

This object may include new rules or change initial rules. If it's not an object it's allowed to be undefined or null

---

### `console.log` the list of fabricated words

```js
const list_of_words = words.join(', ');

console.log(list_of_words);
```

---

<br>

# The rules

\* Required in `initial_rules`

## `blueprint`\*

An object where the values is an array of all letters which are allowed to follow the letter to the left (the object key).

```js
blueprint: {
    a: ['r', 'rr', 's'],
    e: ['r', 's', 'ss'],
    r: ['a', 'e'],
    rr: ['a', 'e'],
    s: ['r'],
    ss: ['a', 'e'],
}
```

## `max_length`\*

The maximum word length word-fabricator will try to make the words before going to the next one.

```js
max_length: 4;
```

## `initial_chars`\*

An array of the first letter combinations allowed to be the beginning of a word.

```js
initial_chars: ['a', 'e', 'r', 's'];
```

<br>

# Roadmap

-   [x] Validate rules
-   [ ] Arrays and strings should kind of be seen as the same
-   [ ] Add some more rules
    -   [ ] min_length
    -   [ ] length (specified exact length)
    -   [ ] Words to be excluded
        -   [ ] Exact match
        -   [ ] Substring
        -   [ ] Regex
    -   [ ] Something about the endings of the words (allowed, disallowed)
    -   [ ] Limit the amount of words to be fabricated at a time <!-- probably using generator function with yield somewhere -->

### Maybe

-   [ ] All rules are allowed as snake_case as well as camelCase (other cases?)
-   [ ] Decide if standard should be max segments instead of max length

## The user experience I want to achieve

1. install the package
2. require the package
3. provide some initial rules
    1. throws error if something is invalid
4. run the function with some additional rules
5. get the fabricated words
