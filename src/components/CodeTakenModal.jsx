import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

const CodeTakenModal = ({ result, onClose }) => {
    if (!result || result.error !== "CODE_TAKEN") return null

    return (
        <Modal show centered onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Código indisponível!</Modal.Title>
            </Modal.Header>

            <Modal.Body className="text-center">
                <p className="mb-2">
                    O código{" "}
                    <strong className="text-primary">{result.code}</strong> já
                    está em uso.
                </p>

                <p>Escolha outro e tente novamente.</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={onClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CodeTakenModal
