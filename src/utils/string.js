export const extractID = (url) => {
    const CHAR_NEED_ITS = 2
    return url.slice(-CHAR_NEED_ITS)
}
