# Word Fabricator

Generate fictional words by specifying rules

<br>

```js
const configure_word_fabricator = require('./path/to/word-fabricator');

const word_fabricator = configure_word_fabricator({
    blueprint: {
        dr: ['ago', 'e'],
        ago: ['n'],
        n: ['e', 'ago'],
        e: ['gg'],
        gg: [],
    },
    max_length: 6,
    initial_parts: ['dr', 'ago', 'n', 'e'],
});

const fictional_words = word_fabricator();

console.log(fictional_words.join(', '));

// dr, drago, dragon, dre, dregg, ago, agon, agone, n, ne, negg, nago, nagon, nagone, e, egg
```

[code from _demo/usage.js_](./demo/usage.js)

<br>
<br>

# Getting started

## How to install

```bash
npm install word-fabricator
```

<br>

## How to use

---

### `require('word-fabricator')`

Returns a function to make configurations for how the words will be fabricated

```js
const configure_word_fabricator = require('word-fabricator');
```

---

### `configure_word_fabricator`

This function requires some initial rules and returns the actual `word_fabricator`

```js
const word_fabricator = configure_word_fabricator(initial_rules); // specify required rules
```

#### `initial_rules`

This plain object may specify any [rules](#the-rules), however it must specify the required rules; [`blueprint`](#blueprint), [`max_length`](#max_length) and [`initial_parts`](#initial_parts)

---

### `word_fabricator`

Returns the array of fictional words which are fabricated using the provided rules (initial rules and additional rules)

```js
const words = word_fabricator(); // change nothing
// or
const words = word_fabricator(additional_rules); // override/append rules
```

#### `additional_rules`

This object may be `undefined` to change nothing or specify new rules and/or change predefined initial rules

---

### `console.log` the list of fabricated words

```js
const list_of_words = words.join(', ');

console.log(list_of_words);
```

---

<br>

# The rules

\* Required in [`initial_rules`](#initial_rules)

## `blueprint`\*

An object where the values is an array of different letters, or rather segments, which are allowed to succeed after the letter segment which is its key. Segments are either one or multiple letters in a string

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

The maximum number of letters word-fabricator will try to build words

```js
max_length: 4;
```

## `initial_parts`\*

An array of letter segments which every word will be built upon

```js
initial_parts: ['a', 'e', 'r', 's', 'sa'];
```

<br>

# Roadmap

-   Validate rules
-   Provide great error messages
-   Arrays and strings should kind of be seen as the same
-   Add some more rules
    -   min_length
    -   length (specified exact length)
    -   Words to be excluded
        -   Exact match
        -   Substring
        -   Regex
    -   Something about the endings of the words (allowed, disallowed)
    -   Limit the amount of words to be fabricated at a time <!-- probably using generator function with yield somewhere -->

### Maybe

-   All rules are allowed as snake_case as well as camelCase (other cases?)
-   Decide if standard should be max segments instead of max length

## The user experience I would like to achieve

1. install the package
2. require the package
3. provide some initial rules
    1. throws error if something is invalid
4. run the function with some additional rules
5. get the fabricated words
