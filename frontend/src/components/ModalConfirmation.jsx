import React from 'react';
import { Button, Modal, Row } from 'react-bootstrap';

export const ModalConfirmation = ({
	onShow,
	hide,
	question,
	buttonText,
	action,
}) => {
	return (
		<Modal
			show={onShow}
			onHide={hide}>
			<Modal.Body className="p-2 px-3">
				<Row className="d-flex gap-1">
					<h4 className="text-center w-1"> {question}</h4>
					<Button
						variant="primary"
						onClick={action}>
						{buttonText}
					</Button>
					<Button
						variant="light"
						onClick={hide}>
						Close
					</Button>
				</Row>
			</Modal.Body>
		</Modal>
	);
};
