const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL

import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Toast from "react-bootstrap/Toast"

import { useEffect, useState } from "react"
import { createQrCode } from "../api/qrCode"

import "../App.css"

const ResultModal = ({ link, useQr, onClose, error }) => {
	if (!link || error) return null
	const show = !!link && !error

	const origin = new URL(FRONTEND_URL).origin
	const host = new URL(FRONTEND_URL).host

	const fullShortUrl = link ? `${origin}/${link.code}` : ""
	const displayShortUrl = link ? `${host}/${link.code}` : ""

	const [qrCode, setQrCode] = useState(null)
	const [showToast, setShowToast] = useState(false)

	useEffect(() => {
		if (!show || !useQr) return

		const controller = new AbortController()

		async function loadQr() {
			try {
				const base64 = await createQrCode(
					shortUrl,
					link.mainColor,
					link.secondaryColor,
					{ signal: controller.signal },
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

		return () => controller.abort()

	}, [fullShortUrl, link.mainColor, link.secondaryColor])

	function copy() {
		navigator.clipboard.writeText(fullShortUrl)
		setShowToast(true)
	}

	return (
		<Modal show centered onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title>Link criado com sucesso!</Modal.Title>
			</Modal.Header>

			<Modal.Body className="text-center">
				<p className="mb-2" style={{ overflow: "hidden" }}>
					<strong>Original:</strong> {link.url}
				</p>

				<p className="mb-2">
					<strong>Encurtado:</strong>{" "}
					<a href={fullShortUrl} target="_blank" rel="noreferrer">
						{displayShortUrl}
					</a>
				</p>

				{link.protected && (
					<p className="text-primary fw-bold">
						Este link está protegido por senha
					</p>
				)}

				{!qrCode && useQr && (
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
			</Modal.Body>

			<Modal.Footer>
				<Button variant="primary" onClick={copy}>
					Copiar
				</Button>
			</Modal.Footer>
			<Toast
				
				show={showToast}
				onClose={() => setShowToast(false)}
				delay={2000}
				autohide
				bg="secondary"
				className="position-fixed bottom-0 end-0 m-4"
				style={{ width: "auto", minWidth: "200px", maxWidth: "300px" }}
			>
				<Toast.Body className="text-white w-100 fw-semibold">
					Link copiado para a área de transferência!
				</Toast.Body>
			</Toast>
		</Modal>
	)
}

export default ResultModal
