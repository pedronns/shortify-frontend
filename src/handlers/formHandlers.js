import { isValidUrl, isValidPassword } from '../utils/validators'
import { createRandomLink, createCustomLink, deleteLink } from './../api/links'

export function validateForm(formState) {
  const { url, code, useCode, password, usePassword } = formState

  if (!url.trim()) {
    return {
      error: 'URL é obrigatória',
      validated: true,
    }
  }

  if (!isValidUrl(url)) {
    return {
      error: 'URL inválida',
      validated: true,
    }
  }

  if (useCode && !code.trim()) {
    return {
      error: 'Digite um código customizado',
      validated: true,
    }
  }

  if (usePassword && !isValidPassword(password)) {
    return { error: 'A senha deve ter entre 8 e 50 caracteres.' }
  }

  return null
}

export function buildPayload(formState) {
  const { url, password, code, usePassword, useCode } = formState

  const payload = useCode
    ? {
        url,
        code,
        ...(usePassword && { password }),
      }
    : {
        url,
        ...(usePassword && { password }),
      }

  return payload
}

export async function submitLink(payload, useCode) {
  return useCode ? createCustomLink(payload) : createRandomLink(payload)
}

export async function removeLink(code) {
  return deleteLink(code)
}
