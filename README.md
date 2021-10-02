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

// Output:

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

# Getting started

## How to install

```bash
npm install word-fabricator --save
```

<br>

## How to use

### `require('word-fabricator')`

Returns a configuration function

```js
const word_fabricator_config = require('word-fabricator');
```

### `word_fabricator_config`

This configuration function requires some initial rules to be provided

```js
const word_fabricator = word_fabricator_config(initial_rules);
```

It returns the actual `word_fabricator`

#### `initial_rules`

This must be an object and is required to include the rules [`blueprint`](#blueprint), [`max_length`](#max_length) and [`initial_chars`](#initial_chars)

### `word_fabricator`

Running the word_fabricator function returns the words fabricated from the rules, but not just the initial_rules, these can be changed with additional rules

```js
const fictional_words = word_fabricator(additional_rules);
```

#### `additional_rules`

This can be undefined, null or an object. This object may include new rules or rules to be changed that are stated in the initial_rules

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
    s: ['a', 'e'],
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
