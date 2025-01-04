export const hasNewLine = (str: string): boolean => {
    return /\r|\n/.test(str);
}

export const getSubStrings = (str: string): string[] => {
    return str.split(/\r|\n/);
}