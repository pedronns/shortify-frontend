import { useState, useRef } from "react"
import useSubmit from "../hooks/useSubmit"

import {
	Container, Button,
	Form, Row, Col,
	OverlayTrigger, Tooltip,
} from "react-bootstrap"
import { FiEye, FiEyeOff, FiInfo } from "react-icons/fi"

import { isValidUrl, isValidCode, isValidPassword } from "../utils/validators"
import FormInput from "../components/FormInput"
import ResultModal from "../components/ResultModal"
import CodeTakenModal from "../components/CodeTakenModal"
import "../App.css"
import logo from "../img/logo.png"

export default function CreateLink({ onLinkCreated }) {
	const initialFormState = {
		url: "",
		password: "",
		code: "",
		mainColor: "#000000",
		secondaryColor: "#ffffff",
		loading: false,
		validated: false,
		result: null,
		useCode: false,
		usePassword: false,
		showPassword: false,
		useQr: false,
	}

	const [formState, setFormState] = useState(initialFormState)

	const inputRef = useRef(null)

	const handleSubmit = useSubmit({
		formState,
		setFormState,
		inputRef,
		onLinkCreated
	})

	const handleToggle = () => {
		setFormState((prev) => ({
			...prev,
			showPassword: !prev.showPassword,
		}))

		setTimeout(() => {
			inputRef.current?.focus()
		}, 0)
	}

	const handleChange = (field) => (e) => {
		setFormState((prev) => ({
			...prev,
			[field]: e.target.value,
			validated: false,
		}))
	}

	const handleSwitch = (field) => () => {
		setFormState((prev) => {
			const hasResult = !!prev.result

			if (hasResult) {
				return {
					...prev,
					result: null,
					validated: false,
					[field]: !prev[field],
				}
			}

			return {
				...prev,
				[field]: !prev[field],
				validated: false,
			}
		})
	}

	function handleClose() {
		setFormState((prev) => ({
			...prev,
			result: null,
		}))
	}

	const {
		url,
		password,
		code,
		mainColor,
		secondaryColor,
		result,
		validated,
		loading,
		useCode,
		usePassword,
		showPassword,
		useQr,
	} = formState

	const checkLabels = {
		useCode: "Personalizar",
		usePassword: "Protegido",
		useQr: "QR Code",
	}

	return (
		<Container className="main mt-5 p-4 w-75 text-center">
			<div className="d-flex justify-content-center align-items-center gap-2 mb-2">
				<img src={logo} alt="logo" style={{ width: "50px" }} />
				<h1 className="m-0 text-primary">Shortify</h1>
			</div>
			<p>Seu encurtador de links</p>

			<Form noValidate onSubmit={handleSubmit}>
				{/* URL */}
				<Row>
					<Col xs={12} md={9} className="mx-auto">
						<FormInput
							label="URL do link"
							info="O endereço completo do site que será encurtado."
							placeholder="https://exemplo.com"
							value={url}
							ref={inputRef}
							onChange={handleChange("url")}
							feedback={
								validated && !isValidPassword(password)
									? "Insira uma URL válida"
									: null
							}
							isValid={
								validated &&
								isValidUrl(url) &&
								url.trim() !== ""
							}
							isInvalid={
								validated &&
								(!url.trim() || !isValidUrl(url))
							}
						>
						</FormInput>
					</Col>
				</Row>
				{/* switches */}
				<Row className="mb-2">
					<Col className="d-flex flex-wrap justify-content-center gap-4">
						{["useCode", "usePassword", "useQr"].map((field) => (
							<div
								className="d-flex flex-column align-items-center"
								key={field}
							>
								<Form.Check
									type="switch"
									checked={formState[field]}
									onChange={handleSwitch(field)}
								/>
								<Form.Label className="mt-1 text-center">
									{checkLabels[field]}
								</Form.Label>
							</div>
						))}
					</Col>
				</Row>


				{(useCode || usePassword) && (
					<Row className="justify-content-center">
						{/* code */}
						{useCode && (
							<Col xs={12} md={4}>
								<FormInput
									label="Código customizado"
									info="Define o final do link encurtado [ex: short.ly/meu-codigo]"
									placeholder="meu-codigo"
									value={code}
									onChange={handleChange("code")}
									isInvalid={
										validated && !isValidCode(code)
									}
									isValid={validated && isValidCode(code)}
									feedback={
										validated && !isValidCode(code)
											? "O código deve ter entre 6 e 20 caracteres e conter apenas letras, números, '_' ou '-'."
											: null
									}
								>
								</FormInput>
							</Col>
						)}

						{/* password */}
						{/* some workarounds were required */}
						{usePassword && (
							<Col xs={12} md={4}>
								<Form.Group className="mb-3">
									<div className="d-flex justify-content-center align-items-center gap-1 mb-1">
										<Form.Label className="mb-0">
											Senha
										</Form.Label>

										<OverlayTrigger
											placement="right"
											overlay={
												<Tooltip>
													Protege o link com uma senha
													de acesso
												</Tooltip>
											}
										>
											<span
												role="button"
												tabIndex={0}
												className="text-primary mb-1"
												style={{ cursor: "pointer" }}
											>
												<FiInfo size={16} />
											</span>
										</OverlayTrigger>
									</div>

									<div
										className={`password-group ${validated &&
											!isValidPassword(password)
											? "invalid"
											: ""
											}`}
									>
										<input
											className="password-input"
											ref={inputRef}
											placeholder={
												showPassword
													? "senhasegura"
													: "•••••••••••"
											}
											type={
												showPassword
													? "text"
													: "password"
											}
											value={password}
											onChange={handleChange("password")}
											required
										/>

										<div
											className="eye-toggle"
											onClick={handleToggle}
											role="button"
										>
											{showPassword ? (
												<FiEye />
											) : (
												<FiEyeOff />
											)}
										</div>
									</div>

									{validated &&
										!isValidPassword(password) && (
											<div className="feedback-invalid">
												A senha deve ter entre 8 e 50
												caracteres.
											</div>
										)}
								</Form.Group>
							</Col>
						)}
					</Row>
				)}

				{/* qr code */}
				{useQr && (
					<Row className="mb-3">
						<div className="d-flex justify-content-center align-items-center gap-1 mb-1">
							<Form.Label className="mb-0">QR Code</Form.Label>

							<OverlayTrigger
								placement="right"
								overlay={
									<Tooltip>
										Escolha as cores do QR Code que será
										gerado com o link
									</Tooltip>
								}
							>
								<span
									role="button"
									tabIndex={0}
									className="text-primary mb-1"
									style={{ cursor: "pointer" }}
								>
									<FiInfo size={16} />
								</span>
							</OverlayTrigger>
						</div>
						<Col xs={12} md={4} className="mx-auto">
							<Row>
								{[
									{
										label: "Cor principal",
										value: mainColor,
										setter: "mainColor",
									},
									{
										label: "Cor secundária",
										value: secondaryColor,
										setter: "secondaryColor",
									},
								].map(({ label, value, setter }) => (
									<Col
										xs={12}
										sm={6}
										className="text-center"
										key={setter}
									>
										<Form.Label>{label}</Form.Label>
										<Form.Control
											type="color"
											className="w-75 mx-auto"
											value={value}
											onChange={handleChange(setter)}
										/>
									</Col>
								))}
							</Row>
						</Col>
					</Row>
				)}

				<Row>
					<Col className="d-flex justify-content-center">
						<Button
							type="submit"
							className="btn-lg"
							disabled={loading}
						>
							{loading ? "Encurtando..." : "Encurtar"}
						</Button>
					</Col>
				</Row>
			</Form>

			<ResultModal
				link={result}
				useQr={useQr}
				onClose={handleClose}
				error={result?.error}
			/>

			<CodeTakenModal result={result} onClose={handleClose} />
		</Container>
	)
}
