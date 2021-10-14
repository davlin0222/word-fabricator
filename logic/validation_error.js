const fs = require('fs');

require('colors');
const StackTracey = require('stacktracey');

module.exports = validation_error;

/**
 * validation_error
 * @param {string} description
 * @returns Validation_error
 */
function validation_error(description) {
    if (description == null) return null;
    const validation_error = new Error(description);
    validation_error.name = 'Validation_error';

    const { items: stack_frames } = new StackTracey(validation_error);

    const user_stack_frames = stack_frames
        .filter(stack_frame => !stack_frame.beforeParse.includes('node:internal'))
        .filter((stack_frame, index, stack_frames) => {
            if (stack_frame.beforeParse.includes('word-fabricator\\scripts')) return true;
            if (!stack_frame.beforeParse.includes('word-fabricator')) return true;
            if (index === stack_frames.length - 1) return true;
        });

    const formatted_user_stack_frames = user_stack_frames.map(
        ({ file, fileShort, line, column, callee }) => {
            try {
                const code_lines = fs.readFileSync(file, 'utf8').split('\n');

                const code_lines_with_pointer = code_lines.reduce(
                    (previous_code_lines, code_line, index) => {
                        const formatted_line = `${index + 1}\t${code_line}`;

                        if (index === line) {
                            return [
                                ...previous_code_lines,
                                '\t' + ' '.repeat(column - 1) + '^'.red,
                                '    ' + formatted_line,
                            ];
                        }

                        if (index + 1 === line) {
                            return [
                                ...previous_code_lines,
                                '  > '.red + formatted_line + ' <'.red,
                            ];
                        }

                        return [...previous_code_lines, '    ' + formatted_line];
                    },
                    []
                );

                const positition = `${line}:${column}`;
                const stack_frame_description = `Inside scope ${
                    callee ? callee.green : 'anonymous function'.green
                } in file ${fileShort.green} at ${positition.brightWhite}`;

                const code_lines_before = 5;
                const code_lines_after = 5;

                const code_with_pointer = code_lines_with_pointer
                    .slice(
                        Math.max(line - code_lines_before, 0),
                        Math.min(line + code_lines_after, code_lines_with_pointer.length)
                    )
                    .join('\n');

                return [stack_frame_description, '', code_with_pointer].join('\n');
            } catch {
                const positition = `${line}:${column}`;
                const stack_frame_description = `Inside scope ${
                    callee ? callee.green : 'anonymous function'.green
                } in file ${fileShort.green} at ${positition.brightWhite}`;

                return stack_frame_description;
            }
        }
    );

    const formatted_validation_error = new Error(
        [
            validation_error.message,
            '',
            '',
            formatted_user_stack_frames.join('\n\n\n'),
            '',
            '',
            'Source error message'.yellow,
            '',
            validation_error.stack,
        ].join('\n')
    );

    formatted_validation_error.name = '';
    formatted_validation_error.stack = '';

    return formatted_validation_error;
}
