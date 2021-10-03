module.exports = fabricate_words;

/**
 * fabricate_words
 * @param {Object.<string, string[]>} blueprint a plain object where every key is a string corresponding to an array of strings
 * @param {number} max_length a positive integer
 * @param {string[]} initial_parts an array of strings
 * @returns {string[]} an array of strings
 */
function fabricate_words(blueprint, max_length, initial_parts) {
    if (max_length <= 0) return [];
    if (max_length == 1) return initial_parts;

    const generated_words = initial_parts
        .map(initial_part => {
            return succeeding_segment_groups([initial_part]);
        })
        .flat();

    return generated_words;

    function succeeding_segment_groups(segment_group) {
        const blueprint_parts = blueprint[segment_group[segment_group.length - 1]];

        return blueprint_parts.reduce(
            (segment_groups, blueprint_part) => {
                const combined_segment_group = [...segment_group, blueprint_part];

                if (combined_segment_group.join('').length == max_length)
                    return [...segment_groups, combined_segment_group.join('')];

                if (combined_segment_group.join('').length > max_length)
                    return [...segment_groups];

                return [
                    ...segment_groups,
                    ...succeeding_segment_groups(combined_segment_group),
                ];
            },
            [segment_group.join('')]
        );
    }
}
