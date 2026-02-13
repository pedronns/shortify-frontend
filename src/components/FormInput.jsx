import { Form, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap"
import { FiInfo } from "react-icons/fi"
import { cloneElement } from "react"

export default function FormInput({
	colSm = 12,
	type,
	label,
	info,
	placeholder,
	feedback,
	children,
	value,
	onChange,
	isInvalid,
	isValid,
	rightElement
}) {
	return (
		<Form.Group as={Row} className="mb-3 justify-content-center">
			<div className="d-flex justify-content-center align-items-center gap-1 mb-1">
				<Form.Label className="mb-0 font-weight-bold">
					{label}
				</Form.Label>

				{info && (
					<OverlayTrigger
						placement="top"
						overlay={<Tooltip>{info}</Tooltip>}
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
				)}
			</div>

			{children &&
				cloneElement(children, {
					isInvalid: !!feedback,
				})}

			<div className="position-relative">

				<Form.Control
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					required
					autoFocus // teste
					isInvalid={isInvalid}
					isValid={isValid}
				/>

				{rightElement && (
					<div className="position-absolute top-50 end-0 translate-middle-y pe-3 me-2">
						{rightElement}
					</div>
				)}

				{feedback && (
					<Form.Control.Feedback className="text-wrap" type="invalid">
						{feedback}
					</Form.Control.Feedback>
				)}
			</div>
		</Form.Group>
	)
}
