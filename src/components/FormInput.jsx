import { Form, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap"
import { FiInfo } from "react-icons/fi"
import { cloneElement } from "react"

export default function FormInput({
	colSm = 12,
	label,
	info,
	feedback,
	children,
}) {
	return (
		<Form.Group as={Row} className="mb-3 justify-content-center">
			<Col sm={colSm}>
				<div className="d-flex justify-content-center align-items-center gap-1 mb-1">
					<Form.Label className="mb-0 font-weight-bold">
						{label}
					</Form.Label>

					{info && (
						<OverlayTrigger
							placement="right"
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

				{feedback && (
					<Form.Control.Feedback type="invalid">
						{feedback}
					</Form.Control.Feedback>
				)}
			</Col>
		</Form.Group>
	)
}
