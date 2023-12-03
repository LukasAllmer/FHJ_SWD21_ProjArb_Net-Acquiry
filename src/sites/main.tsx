import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./main.sass";
import LogoWithText from "./comp/logoWithText";
import { complete, randomJson } from "../mock-objects/index";

function App() {
	return (
		<div className="startContainer">
			<header className="startHeader">
				<LogoWithText />
			</header>
			<main className="startMain">
				<UploadOwnJSON />
				<UseMockObject />
				<UseRandomMockObject />
			</main>
		</div>
	);
}

function UseMockObject() {
	const navigate = useNavigate();
	return (
		<>
			<button
				onClick={() => {
					navigate("/request", {
						state: complete,
						replace: true,
					});
				}}
			>
				Try the form with pre-set mock-data
			</button>
		</>
	);
}

function UseRandomMockObject() {
	const navigate = useNavigate();
	return (
		<>
			<button
				onClick={() => {
					navigate("/request", {
						state: randomJson[Math.floor(Math.random() * (21 - 0) + 0)],
						replace: true,
					});
				}}
			>
				Try the form with random mock-data
			</button>
		</>
	);
}

function UploadOwnJSON() {
	const [files, setFiles] = useState("");
	const navigate = useNavigate();

	const handleChange = () => {
		const fileInput = document.querySelector(
			`input[name="jsonUpload"]`
		) as HTMLInputElement;
		const reader = new FileReader();
		const decoder = new TextDecoder("utf-8");
		const fileContent = fileInput.files?.item(0);
		if (fileContent instanceof Blob) {
			reader.readAsText(fileContent, "UTF-8");
			reader.onload = (e) => {
				let result = e.target?.result;
				if (result instanceof ArrayBuffer) result = decoder.decode(result);
				if (result) {
					console.log(JSON.parse(result));
					setFiles(JSON.parse(result));
				}
			};
		}
	};
	return (
		<>
			<p>Upload your own JSON-file to test:</p>
			<div className="customFileSubmit">
				<input
					type="file"
					name="jsonUpload"
					accept=".json"
					onChange={handleChange}
				/>
				<button
					onClick={() => {
						if (files)
							navigate("/request", {
								state: files,
								replace: true,
							});
					}}
				>
					Go to form
				</button>
			</div>
		</>
	);
}

export default App;
