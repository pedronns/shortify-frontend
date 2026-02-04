import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "../App.css"

const API = import.meta.env.VITE_API_URL

export default function OpenLink() {

  const { code } = useParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [protectedLink, setProtectedLink] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  // TO FIX: clicks incrementation
  useEffect(() => {
    const fetchLinkInfo = async () => {
      try {
        const res = await fetch(`${API}/info/${code}`)
        if (!res.ok) throw new Error("Link not found")

        const data = await res.json()
        if (data.protected) {
          setProtectedLink(true)
          return
        }
        const redirectRes = await fetch(`${API}/${code}`)
        const redirectData = await redirectRes.json()

        window.location.href = redirectData.originalUrl
      } catch {
        navigate("/404", { replace: true })
      } finally {
        setLoading(false)
      }
    }

    fetchLinkInfo()
  }, [code, navigate])

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    )
  }

  const handleUnlock = async (e) => {
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
      if (!res.ok) throw new Error(data.error || "Senha incorreta")

      window.location.href = data.url
    } catch (err) {
      setError(err.message || "Erro de conexão com o servidor")
    } finally {
      setLoading(false)
    }
  }

  if (!protectedLink) return null

  return (
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
            <p className="text-center text-danger mb-3">{error}</p>
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
  )
}
