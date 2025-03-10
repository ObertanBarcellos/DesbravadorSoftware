export function formatProjectDescription(text: string, num: number = 30): string {
    if (text.length >= num) {
        return text.slice(-(num-3)) + '...'
    } else {
        return text
    }
}