import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import HighlightText from "./comp/boldText";
import "./request.sass";
import parseOutputData from "../util/outputParser";
import LogoWithoutText from "./comp/logoWithoutText";

import { ErrorBoundary } from "react-error-boundary";

interface DataObject {
	requestId: number;
	personalData: PersonalData;
	requesterData: RequesterData;
	requestContent: InputField[];
}

interface PersonalData {
	firstName: string;
	lastName: string;
	company: string;
}

interface RequesterData {
	firstName: string;
	lastName: string;
	company: string;
}

const App: React.FC = () => {
	const { state } = useLocation();
	const dataObject: DataObject = state;
	try {
		return (
			<>
				<header>
					<a href="/">
						<LogoWithoutText />
					</a>
				</header>
				<main>
					<ErrorBoundary fallback={<ErrorOnFileRead />}>
						<Heading
							requestContent={dataObject.requestContent}
							requestId={dataObject.requestId}
							personalData={dataObject.personalData}
							requesterData={dataObject.requesterData}
						/>
						<Form
							requestContent={dataObject.requestContent}
							requestId={dataObject.requestId}
							personalData={dataObject.personalData}
							requesterData={dataObject.requesterData}
						/>
					</ErrorBoundary>
				</main>
			</>
		);
	} catch (error) {
		return (
			<>
				<header>
					<a href="/">
						<LogoWithoutText />
					</a>
				</header>
				<main>
					<h1>Oops!</h1>
					<p>
						Please only use the UI to navigate. Click the logo to return to
						home.
					</p>
				</main>
			</>
		);
	}
};

const ErrorOnFileRead: React.FC = () => {
	return (
		<>
			<h1>Oh no!</h1>
			<p>
				The file you provided unfortunately didn't meet the requirements to be
				rendered. Please try again.
			</p>
		</>
	);
};

const Heading: React.FC<DataObject> = ({ personalData, requesterData }) => {
	return (
		<>
			<h2>Hello {personalData.firstName}!</h2>
			<p>
				<HighlightText text={requesterData.firstName} />{" "}
				<HighlightText text={requesterData.lastName} /> from{" "}
				<HighlightText text={requesterData.company} /> needs you to fill out the
				following form:
			</p>
		</>
	);
};

const Form: React.FC<DataObject> = ({
	personalData,
	requesterData,
	requestId,
	requestContent,
}) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();

	const onSubmit: SubmitHandler<Record<string, any>> = (data) => {
		console.log(data);
		// This data can then be sent to backend to be parsed, instead it's just written to console now
		const postData = parseOutputData(requestId, data);
		console.log(postData);
		navigate("/submitted", {
			state: {
				requestId: requestId,
				requesterData: requesterData,
				personalData: personalData,
			},
			replace: true,
		});

		// Alternative: Convert JSON data to blob and download it
		/*
		const blob = new Blob([JSON.stringify(postData)], {
			type: "application/json",
		});

		const downloadLink = document.createElement("a");
		downloadLink.href = URL.createObjectURL(blob);
		downloadLink.download = "form.json";
		downloadLink.click();
		*/
	};

	const DynamicForm: React.FC<InputField> = ({ fieldId, fieldSubItems }) => {
		return (
			<>
				{fieldSubItems
					? fieldSubItems.map((field) => (
							<div key={getNewId()} className="formField">
								{["radio", "checkbox", "select"].includes(field.fieldType) &&
								field.fieldValues ? (
									<MultiInput
										fieldId={(fieldId ? fieldId + ";" : "") + field.fieldId}
										fieldType={field.fieldType ? field.fieldType : "hidden"}
										fieldDescription={field.fieldDescription}
										fieldValues={field.fieldValues}
										fieldParams={field.fieldParams}
									/>
								) : (
									<Input
										fieldId={(fieldId ? fieldId + ";" : "") + field.fieldId}
										fieldType={field.fieldType ? field.fieldType : "hidden"}
										fieldDescription={field.fieldDescription}
										fieldParams={field.fieldParams}
									/>
								)}

								{field.fieldSubItems ? (
									<DynamicForm
										fieldSubItems={field.fieldSubItems}
										fieldId={(fieldId ? fieldId + ";" : "") + field.fieldId}
										fieldType={field.fieldType}
										fieldValues={field.fieldValues}
										fieldDescription={field.fieldDescription}
										fieldParams={field.fieldParams}
									/>
								) : null}
							</div>
					  ))
					: null}
			</>
		);
	};

	interface FieldInput {
		fieldDescription: string;
		fieldId: string;
		fieldType: string;
		fieldParams: RegisterParams | undefined;
	}
	interface FieldMultiInput {
		fieldDescription: string;
		fieldId: string;
		fieldType: string;
		fieldValues: string[];
		fieldParams: RegisterParams | undefined;
	}

	const Input: React.FC<FieldInput> = ({
		fieldId,
		fieldType,
		fieldDescription,
		fieldParams,
	}) => {
		return (
			<>
				<label>
					{" "}
					{fieldDescription}{" "}
					{fieldParams?.required ? <HighlightText text="*" /> : null}
				</label>
				<input
					type={fieldType}
					{...(fieldParams
						? { ...register(fieldId), ...fieldParams }
						: { ...register(fieldId) })}
				/>
				{fieldType == "range" ? <span>{watch(fieldId)}</span> : null}
				{errors.fieldId && <span>Error!</span>}
			</>
		);
	};

	const MultiInput: React.FC<FieldMultiInput> = ({
		fieldId,
		fieldType,
		fieldDescription,
		fieldValues,
		fieldParams,
	}) => {
		return (
			<>
				{fieldType == "select" ? (
					<>
						<label>
							{fieldDescription}{" "}
							{fieldParams?.required ? <HighlightText text="*" /> : null}
						</label>
						<select
							{...(fieldParams
								? { ...register(fieldId), ...fieldParams }
								: { ...register(fieldId) })}
						>
							<option key={getNewId()} value=""></option>
							{fieldValues.map((value) => (
								<option key={getNewId()} value={value}>
									{value}
								</option>
							))}
						</select>
					</>
				) : (
					<fieldset>
						<legend>
							{" "}
							{fieldDescription}{" "}
							{fieldParams?.required ? <HighlightText text="*" /> : null}
						</legend>
						{fieldValues.map((value) => (
							<label key={getNewId()}>
								<input
									type={fieldType}
									{...(fieldParams
										? { ...register(fieldId), ...fieldParams }
										: { ...register(fieldId) })}
									value={value}
								/>
								{value}
							</label>
						))}
					</fieldset>
				)}
				{errors.fieldId && <span>Error!</span>}
			</>
		);
	};

	let id = 0;
	function getNewId(): number {
		id = id + 1;
		return id + 1;
	}

	return (
		<form className="dynamicForm" onSubmit={handleSubmit(onSubmit)}>
			<h2 className="formTitle">Form</h2>
			<p className="formDescription">
				Values with <HighlightText text="*" /> are required.
			</p>
			<DynamicForm
				fieldSubItems={requestContent}
				fieldId={""}
				fieldType={""}
				fieldValues={undefined}
				fieldParams={undefined}
				fieldDescription={""}
			/>

			<input className="formSubmitButton" type="submit" value="Submit" />
		</form>
	);
};

type InputField = {
	fieldId: number | string;
	fieldType: string;
	fieldSubItems: InputField[] | undefined;
	fieldValues: string[] | undefined;
	fieldParams: RegisterParams | undefined;
	fieldDescription: string;
};

type RegisterParams = {
	// see https://react-hook-form.com/docs/useform/register
	required?: boolean;
	maxLength?: number;
	minLength?: number;
	max?: number;
	min?: number;
	valueAsNumber?: boolean;
	valueAsDate?: boolean;
	disabled?: boolean;
	shouldUnregister?: boolean;
	deps?: string | string[];
};

export default App;
