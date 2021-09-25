module.exports = { fabricate_words };

function fabricate_words(blueprint, max_length, initial_parts) {
    if (max_length == 1) return initial_parts;

    return initial_parts
        .map(initial_part => {
            return succeeding_segment_groups([initial_part]);
        })
        .flat();

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
