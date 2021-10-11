/*
C:\Users\David Lindström\code\projects\word-fabricator\logic\configure.js:17
        throw validation_error;
        ^

Error: the provided initial_rules does not contain the required rules max_length and initial_chars
    at validation_error (C:\Users\David Lindström\code\projects\word-fabricator\logic\rule_validator.js:10:12)
    at rule_validation_error (C:\Users\David Lindström\code\projects\word-fabricator\logic\rule_validator.js:28:16)
    at initial_rules_validator (C:\Users\David Lindström\code\projects\word-fabricator\logic\rule_validator.js:65:16)
    at configure_word_fabricator (C:\Users\David Lindström\code\projects\word-fabricator\logic\configure.js:15:30)
    at Object.<anonymous> (C:\Users\David Lindström\code\projects\word-fabricator\scripts\word-fabricator.script.js:7:25)
    at Module._compile (node:internal/modules/cjs/loader:1101:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1153:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:79:12)

*/

/*

C:\Users\David Lindström\code\projects\word-fabricator\logic\configure.js:16
    if (initial_rules_validation_error) throw initial_rules_validation_error;
                                        ^

Rule validation error

The initial_rules provided 

word-fabricator.script.js:7:25


Original Stacktrace

Validation_error: the provided initial_rules does not contain the required rules max_length and initial_chars
    at validation_error (C:\Users\David Lindström\code\projects\word-fabricator\logic\rule_validator.js:12:19)
    at rule_validation_error (C:\Users\David Lindström\code\projects\word-fabricator\logic\rule_validator.js:34:16)
    at initial_rules_validator (C:\Users\David Lindström\code\projects\word-fabricator\logic\rule_validator.js:71:16)
    at configure_word_fabricator (C:\Users\David Lindström\code\projects\word-fabricator\logic\configure.js:15:44)
    at Object.<anonymous> (C:\Users\David Lindström\code\projects\word-fabricator\scripts\word-fabricator.script.js:7:25)
    at Module._compile (node:internal/modules/cjs/loader:1101:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1153:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:79:12)

*/
