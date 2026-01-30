import isUrl from 'validator/lib/isUrl'

const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL

export function isValidUrl(str) {
  return isUrl(str) && !str.includes(FRONTEND_URL)
}

export function isValidCode(code) {
  const passwordRegex = /^[a-zA-Z0-9_-]{6,20}$/
  return passwordRegex.test(code)
}

export function isValidPassword(password) {
  const passwordRegex = /^.{8,50}$/
  return passwordRegex.test(password)
}
