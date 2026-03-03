export async function createQrCode(
  str,
  main,
  secondary,
  image,
  options = {}
) {
  const { signal } = options

  const normalizeColor = (color) =>
    color?.startsWith('#') ? color.slice(1) : color

  const params = new URLSearchParams({
    text: str,
    margin: '1',
    size: '150',
    dark: normalizeColor(main),
    light: normalizeColor(secondary),
    format: 'base64',
  })

  if (image) {
    params.append('centerImageUrl', image)
  }

  const url = `https://quickchart.io/qr?${params.toString()}`

  const res = await fetch(url, { signal })

  if (!res.ok) {
    const errorMessage = await res.text()
    throw new Error(`Error generating QR: ${errorMessage}`)
  }

  return await res.text()
}