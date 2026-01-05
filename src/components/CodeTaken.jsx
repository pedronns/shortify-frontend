import '../App.css'

export default function CodeTaken({ code }) {
    if (!code) return null;

    return (
        <div className="shortify-card mt-4 mx-auto text-center">
            <h3 className="mb-3 text-danger">
                Código indisponível
            </h3>

            <p className="mb-2">
                O código <strong>{code}</strong> já está em uso.
            </p>

            <p className="text-muted">
                Escolha outro e tente novamente.
            </p>

            <button
                className="btn-lg mt-3"
                onClick={() => window.location.reload()}
            >
                Tentar outro código
            </button>
        </div>
    );
}
