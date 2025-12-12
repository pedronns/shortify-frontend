import '../App.css'

export default function CodeTaken({ code }) {
    if (!code) return null;

    return (
        <div className="spotify-card mt-4 mx-auto text-center">
            <h3 className="mb-3" style={{ color: "#f33" }}>
                Código indisponível
            </h3>

            <p className="mb-2">
                O código <strong style={{ color: "#fff" }}>{code}</strong> já está em uso.
            </p>

            <p className="text-muted">
                Escolha outro e tente novamente.
            </p>

            <button
                className="btn-lg mt-3"
                style={{ backgroundColor: "#1db954", width: "60%" }}
                onClick={() => window.location.reload()}
            >
                Tentar outro código
            </button>
        </div>
    );
}
