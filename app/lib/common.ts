
export function makeGroups<T>(arr: T[], accessor: (item: T) => string): { [group: string]: T[]; } {
    const group: { [group: string]: any[]; } = {};
    for (const item of arr) {
        const groupValue = accessor(item);
        if (group[groupValue] === null || group[groupValue] === undefined) {
            group[groupValue] = [item];
        } else {
            group[groupValue].push(item);
        }
    }
    return group;
}