import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

const API = import.meta.env.VITE_API_URL

export default function OpenLink() {
    const { code } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!code) {
            navigate("/")
            return
        }

        async function resolveLink() {
            try {
                const res = await fetch(`${API}/${code}`)

                if (res.redirected) {
                    window.location.href = res.url
                    return
                }

                const data = await res.json()

                if (data.protected === true) {
                    navigate(`/unlock/${code}`)
                    return
                }

                navigate("/")
            } catch {
                navigate("/")
            }
        }

        resolveLink()
    }, [code, navigate])

    return null
}
