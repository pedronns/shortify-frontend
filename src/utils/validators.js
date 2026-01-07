export function isValidUrl(str) {
    try {
        const { protocol } = new URL(str)
        return protocol === "http:" || protocol === "https:"
    } catch (_) {
        return false
    }
}

export function isValidCode(code) {
    const passwordRegex = /^[a-zA-Z0-9_-]{6,20}$/
    return passwordRegex.test(code)
}

export function isValidPassword(password) {
    const passwordRegex = /^.{8,50}$/
    return passwordRegex.test(password)
}
