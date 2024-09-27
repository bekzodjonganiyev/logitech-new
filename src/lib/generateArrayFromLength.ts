export function arrayFromLen(len: number) {
    const arr: any[] = []

    for (let i = 0; i < len; i++) {
        arr.push(i)
    }

    return arr
}