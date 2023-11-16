
export function process_comma_separated_text(input) {
    return input.split(',').map(s => s.trim().replace(/\s/, ' '));
}