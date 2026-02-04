const VITE_API_URL = import.meta.env.VITE_API_URL

async function postLink(data, endpoint) {
  const res = await fetch(`${VITE_API_URL}/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const json = await res.json()
  if (!res.ok) throw json
  return json
}

export async function deleteLink(code) {
  const res = await fetch(`${VITE_API_URL}/${code}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('DELETE_FAILED')
  }
}

export const createRandomLink = (data) => postLink(data, 'random')
export const createCustomLink = (data) => postLink(data, 'custom')
