import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Diseasepre = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [previewImageUrl, setPreviewImageUrl] = useState("");
	const [diseaseResult, setDiseaseResult] = useState("");
	const [preventionLink, setPreventionLink] = useState("");

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewImageUrl(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handlePredict = async () => {
		if (!selectedFile) {
			alert("Please select an image.");
			return;
		}

		const formData = new FormData();
		formData.append("file", selectedFile);

		try {
			const response = await fetch("http://localhost:3002/predict", {
				method: "POST",
				body: formData,
			});
			const data = await response.json();
			setDiseaseResult(data.disease);
			setPreventionLink(data.preventionLink); // Set the prevention link
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div>
			<Navbar />
			<div className="border-2 rounded p-10">
				<div className="max-w-md mx-auto border-4 rounded-sm">
					<h2 className="text-xl font-serif font-bold mb-4">Plant Disease Detection</h2>
					<input
						type="file"
						accept="image/*"
						className="mb-4"
						onChange={handleFileChange}
					/>
					<br />
					{previewImageUrl && (
						<img
							src={previewImageUrl}
							alt="Preview"
							className="max-w-full h-auto mb-4"
						/>
					)}
					<br />
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={handlePredict}
					>
						Detect Disease
					</button>
					{diseaseResult && (
						<div className="mt-4">
							<h3 className="text-lg font-bold">Disease Detected:</h3>
							<p>{diseaseResult}</p>
							{preventionLink && (
								<p>
									<Link
										href={preventionLink}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-500 hover:underline"
									>
										Click here for prevention
									</Link>
								</p>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Diseasepre;
