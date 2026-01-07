import { useState, useRef, use } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { Container, Button, Form, InputGroup, Row, Col } from "react-bootstrap"
import { createRandomLink, createCustomLink } from "../api/links"
import { isValidUrl, isValidCode, isValidPassword } from "../utils/validators"
import LinkResult from "../components/LinkResult"
import CodeTaken from "../components/CodeTaken"
import "../App.css"
import logo from "../img/logo.png"

export default function CreateLink() {
    const [formState, setFormState] = useState({
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
    })

    const inputRef = useRef(null)

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
        setFormState((prev) => ({
            ...prev,
            [field]: !prev[field],
            validated: false,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { url, password, code, usePassword, useCode } = formState

        if (!url.trim() || !isValidUrl(url)) {
            setFormState((prev) => ({
                ...prev,
                result: {
                    error: !url.trim() ? "URL é obrigatória" : "URL inválida",
                },
                validated: true,
            }))
            return
        }
        if (useCode && !code.trim()) {
            setFormState((prev) => ({
                ...prev,
                result: { error: "Digite o código customizado" },
                validated: true,
            }))
            return
        }

        setFormState((prev) => ({ ...prev, loading: true, result: null }))

        try {
            const data = await (useCode
                ? createCustomLink({
                      url,
                      password: usePassword ? password : "",
                      code,
                  })
                : createRandomLink({
                      url,
                      password: usePassword ? password : "",
                  }))
            setFormState((prev) => ({
                ...prev,
                result: {
                    ...data,
                    mainColor: prev.mainColor,
                    secondaryColor: prev.secondaryColor,
                },
                password: "",
                code: "",
                validated: false,
            }))
            inputRef.current.focus()
        } catch (err) {
            const errorMessage =
                err.error === "CODE_TAKEN"
                    ? { error: "CODE_TAKEN", code }
                    : { error: err.error || "Erro de conexão com o servidor" }
            setFormState((prev) => ({ ...prev, result: errorMessage }))
        } finally {
            setFormState((prev) => ({ ...prev, loading: false }))
        }
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
        <Container className="mt-5 p-4 w-75 rounded-4 shadow-sm text-center">
            <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
                <img src={logo} alt="logo" style={{ width: "50px" }} />
                <h1 className="m-0 text-primary">Shortify</h1>
            </div>
            <p>Seu encurtador de links</p>

            <Form noValidate onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={12}>
                        <Form.Control
                            ref={inputRef}
                            type="text"
                            placeholder="https://"
                            value={url}
                            onChange={handleChange("url")}
                            autoFocus
                            required
                            isValid={
                                validated &&
                                isValidUrl(url) &&
                                url.trim() !== ""
                            }
                            isInvalid={
                                validated && (!url.trim() || !isValidUrl(url))
                            }
                        />
                        <Form.Control.Feedback type="invalid">
                            Informe uma URL válida com http:// ou https://
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <div className="d-flex flex-wrap justify-content-center gap-4 mb-3">
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
                </div>

                {useCode && (
                    <Form.Group className="mb-3 col-12 col-md-6 mx-auto">
                        <Form.Control
                            type="text"
                            placeholder="Código customizado"
                            value={code}
                            onChange={handleChange("code")}
                            required
                            isInvalid={validated && !isValidCode(code)}
                            isValid={validated && isValidCode(code)}
                        />
                        <Form.Control.Feedback type="invalid">
                            O código deve ter entre 6 e 20 caracteres e conter
                            apenas letras, números, '_' ou '-'.
                        </Form.Control.Feedback>
                    </Form.Group>
                )}

                {usePassword && (
                    <Form.Group className="mb-3 col-12 col-md-6 mx-auto">
                        <InputGroup className="password-group">
                            <Form.Control
                                className="password-input"
                                placeholder="Senha do link"
                                ref={inputRef}
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={handleChange("password")}
                            />

                            <InputGroup.Text
                                className="eye-toggle"
                                onClick={handleToggle}
                                role="button"
                            >
                                {showPassword ? <FiEye /> : <FiEyeOff />}
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                )}

                {useQr && (
                    <Row className="mb-3 col-12 col-md-6 mx-auto">
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
                                    className="w-75 w-sm-50 mx-auto"
                                    value={value}
                                    onChange={handleChange(setter)}
                                />
                            </Col>
                        ))}
                    </Row>
                )}

                <Button type="submit" className="btn-lg" disabled={loading}>
                    {loading ? "Encurtando..." : "Encurtar"}
                </Button>
            </Form>

            {result?.error === "CODE_TAKEN" && <CodeTaken code={result.code} />}
            {result && !result.error && (
                <LinkResult link={result} useQr={useQr} />
            )}
        </Container>
    )
}
