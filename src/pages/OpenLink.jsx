import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "../App.css"

const API = import.meta.env.VITE_API_URL

export default function OpenLink() {
    const { code } = useParams()
    const [password, setPassword] = useState("")
    const [protectedLink, setProtectedLink] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Checks if the link exists and if it's protected
    useEffect(() => {
        async function fetchLinkInfo() {
            try {
                const res = await fetch(`${API}/info/${code}`)
                const data = await res.json()

                if (!res.ok) {
                    setError(data.error || "Link não encontrado")
                    setLoading(false)
                    return
                }

                if (data.protected) {
                    setProtectedLink(true)
                } else {
                    // redireciona direto
                    window.location.href = data.url
                }
            } catch {
                setError("Erro de conexão com o servidor")
            } finally {
                setLoading(false)
            }
        }

        fetchLinkInfo()
    }, [code])

    async function handleUnlock(e) {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            const res = await fetch(`${API}/${code}/unlock`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Senha incorreta")
                setLoading(false)
                return
            }

            // Redireciona para a URL original
            window.location.href = data.url
        } catch {
            setError("Erro de conexão com o servidor")
        } finally {
            setLoading(false)
        }
    }

    if (loading)
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </div>
            </div>
        )

    return protectedLink ? (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div
                className="shortify-card shadow-sm p-4"
                style={{ maxWidth: 420, width: "100%" }}
            >
                <div className="text-center mb-3">
                    <h1 className="h4 mb-1">Link protegido</h1>
                    <p className="text-muted mb-0">
                        Digite a senha para acessar o conteúdo.
                    </p>
                </div>

                <form onSubmit={handleUnlock}>
                    <div className="mb-1">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoFocus
                            disabled={loading}
                        />
                    </div>
                    {error && (
                        <p className="text-center text-danger mb-3">
                            Senha incorreta. Tente novamente.
                        </p>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? "Validando..." : "Desbloquear"}
                    </button>
                </form>
            </div>
        </div>
    ) : null
}
