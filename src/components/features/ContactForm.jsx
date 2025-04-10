import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useEffect, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import AppButton from "../common/AppButton";

function ContactForm() {
	//validation
	const schema = Joi.object({
		rating: Joi.number().min(0).max(10).required(),
		firstName: Joi.string().min(2).max(50).required(),
		lastName: Joi.string().min(2).max(50).required(),
		email: Joi.string()
			.email({ tlds: { allow: false } })
			.required(),
		concern: Joi.string().max(500).optional(),
	});

	function transformErrorMessage(errorKey) {
		const separateField = errorKey
			.replace(/['"]+/g, "")
			.replace(/([a-z])([A-Z])/g, "$1 $2");
		return separateField.charAt(0).toUpperCase() + separateField.slice(1);
	}

	//form controls
	const {
		watch,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: joiResolver(schema),
		defaultValues: {
			rating: 5,
			firstName: "",
			lastName: "",
			email: "",
		},
	});

	const watchRating = watch("rating");

	//submit form
	const [submitted, setSubmitted] = useState(false);

	function onSubmit(data) {
		localStorage.setItem("contactDetails", JSON.stringify(data));
		updateContactDetails();
		setSubmitted(true);
	}

	useEffect(() => {
		return () => {
			setSubmitted(false);
		};
	}, []);

	//submitted message

	const [contactDetails, setContactDetails] = useState({ a: "notchanged" });

	function updateContactDetails() {
		const details = localStorage.getItem("contactDetails");
		const parsedDetails = JSON.parse(details);
		setContactDetails({ ...parsedDetails });
	}

	return (
		<>
			{submitted ? (
				<>
					<div className="thanks">
						Thanks for submitting {contactDetails.firstName}! We'll
						get back to you at {contactDetails.email}
					</div>
				</>
			) : (
				<Container className="mt-5">
					<h2 className="mb-2">Contact Details</h2>
					<h3 className="mb-5">Please submit your details below</h3>
					<Form
						onSubmit={handleSubmit(onSubmit)}
						noValidate="noValidate"
					>
						<Form.Group className="mb-2" controlId="firstName">
							<Form.Label>First Name</Form.Label>
							<Controller
								name="firstName"
								control={control}
								render={({ field }) => (
									<Form.Control
										{...field}
										type="text"
										isInvalid={errors.firstName}
									/>
								)}
							/>
							{errors.firstName && (
								<Form.Text className="text-danger">
									{transformErrorMessage(
										errors.firstName.message
									)}
								</Form.Text>
							)}
						</Form.Group>

						<Form.Group className="mb-2" controlId="lastName">
							<Form.Label>Last Name</Form.Label>
							<Controller
								name="lastName"
								control={control}
								render={({ field }) => (
									<Form.Control
										{...field}
										type="text"
										isInvalid={errors.lastName}
									/>
								)}
							/>
							{errors.lastName && (
								<Form.Text className="text-danger">
									{transformErrorMessage(
										errors.lastName.message
									)}
								</Form.Text>
							)}
						</Form.Group>

						<Form.Group className="mb-3" controlId="email">
							<Form.Label>Email Address</Form.Label>
							<Controller
								name="email"
								control={control}
								render={({ field }) => (
									<Form.Control
										{...field}
										type="email"
										isInvalid={errors.email}
									/>
								)}
							/>
							{errors.email && (
								<Form.Text className="text-danger">
									{transformErrorMessage(
										errors.email.message
									)}
								</Form.Text>
							)}
						</Form.Group>

						<Form.Group className="mb-2 rating" controlId="rating">
							<Form.Label>How do you rate the site?</Form.Label>
							<Controller
								name="rating"
								control={control}
								render={({ field }) => (
									<>
										<Form.Range
											{...field}
											min={0}
											max={10}
											step={1}
										/>
										<Form.Text>{watchRating}</Form.Text>
									</>
								)}
							/>
						</Form.Group>

						<Form.Group className="mb-4" controlId="concern">
							<Form.Label>
								Your Concerns or Suggestions (Optional)
							</Form.Label>
							<Controller
								name="concern"
								control={control}
								render={({ field }) => (
									<Form.Control
										{...field}
										as="textarea"
										rows={3}
										isInvalid={errors.concern}
									/>
								)}
							/>
							{errors.concern && (
								<Form.Text className="text-danger">
									{transformErrorMessage(
										errors.concern.message
									)}
								</Form.Text>
							)}
						</Form.Group>
						<div className="d-flex justify-content-end">
							<Button variant="primary" type="submit">
								Submit
							</Button>
						</div>
					</Form>
				</Container>
			)}
		</>
	);
}

export default ContactForm;
