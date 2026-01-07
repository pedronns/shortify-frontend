export async function createQrCode(str, main, secondary, options = {}) {
    const { signal } = options

    const cleanedMain = main.startsWith("#") ? main.slice(1) : main
    const cleanedSecondary = secondary.startsWith("#")
        ? secondary.slice(1)
        : secondary

    const url = `https://quickchart.io/qr?text=${encodeURIComponent(
        str
    )}&dark=${cleanedMain}&light=${cleanedSecondary}&format=base64`

    const res = await fetch(url, { signal })

    if (!res.ok) {
        const errorMessage = await res.text()
        throw new Error(`Error generating QR: ${errorMessage}`)
    }

    const base64 = await res.text()
    return base64
}
