const API = import.meta.env.VITE_API_URL
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL

import { useEffect, useState } from "react"
import { createQrCode } from "../api/qrCode"
import "../App.css"

export default function LinkResult({ link, useQr }) {
    if (!link) return null

    const [qrCode, setQrCode] = useState(null)

    const shortUrl = `${FRONTEND_URL}/${link.code}`

    useEffect(() => {
        if (!shortUrl || !link.mainColor || !link.secondaryColor) {
            return
        }

        const controller = new AbortController()

        async function loadQr() {
            try {
                const base64 = await createQrCode(
                    shortUrl,
                    link.mainColor,
                    link.secondaryColor,
                    { signal: controller.signal }
                )

                setQrCode(base64)
            } catch (err) {
                if (err.name === "AbortError") {
                    return
                }

                console.error("Erro ao gerar QR Code", {
                    shortUrl,
                    mainColor: link.mainColor,
                    secondaryColor: link.secondaryColor,
                    error: err,
                })
            }
        }

        loadQr()

        return () => {
            controller.abort()
        }
    }, [shortUrl, link.mainColor, link.secondaryColor])

    function copy() {
        navigator.clipboard.writeText(shortUrl)
    }

    return (
        <div className="shortify-card mt-4 mx-auto">
            <div className="card-body">
                <h3 className="card-title text-center mb-3">
                    Link criado com sucesso!
                </h3>

                <p className="mb-2" style={{ overflow: "hidden" }}>
                    <strong>Original:</strong> {link.url}
                </p>

                <p className="mb-2">
                    <strong>Encurtado:</strong>{" "}
                    <a href={shortUrl} target="_blank" rel="noreferrer">
                        {shortUrl}
                    </a>
                </p>

                {link.protected && (
                    <p className="text-primary fw-bold">
                        Este link está protegido por senha
                    </p>
                )}

                {/* QR CODE */}
                {!qrCode && (
                    <div className="d-flex justify-content-center my-3">
                        <div className="spinner-border" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>
                )}

                {useQr && (
                    <div className="text-center my-3">
                        <a
                            href={`data:image/png;base64,${qrCode}`}
                            download={`qrcode-${link.code}`}
                            title="Clique para baixar"
                        >
                            <img
                                src={`data:image/png;base64,${qrCode}`}
                                className="img-fluid"
                                style={{ maxWidth: "200px" }}
                            />
                        </a>
                    </div>
                )}

                <button className="btn btn-secondary mt-3" onClick={copy}>
                    Copiar
                </button>
            </div>
        </div>
    )
}
