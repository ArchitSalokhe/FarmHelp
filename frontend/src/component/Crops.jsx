import React, { useEffect, useState, useRef } from "react";
import { Messages } from "primereact/messages";
import { CropService } from "../service/CropService";
import { WeatherService } from "../service/WeatherService";
import 'primeicons/primeicons.css';
import Navbar from "./Navbar";

function toTitleCase(str) {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

const Crops = () => {
	const [checkboxValue, setCheckboxValue] = useState([]);
	const [nitrogen, setNitrogen] = useState("");
	const [potassium, setPotassium] = useState("");
	const [phosphorus, setPhosphorus] = useState("");
	const [phlevel, setPhlevel] = useState("");
	const [temperature, setTemperature] = useState("");
	const [humidity, setHumidity] = useState("");
	const [rainfall, setRainfall] = useState("");
	const [recommendCrop, setRecommendCrop] = useState("");

	const cropDisplayMessage = useRef();

	const failureCallback = (callback) => {
		console.log(callback);
	};

	useEffect(() => {
		const weatherService = new WeatherService();

		if (window.navigator.geolocation) {
			// Geolocation available
			window.navigator.geolocation.getCurrentPosition((geoLocation) => {
				console.log(geoLocation.coords.latitude);
				console.log(geoLocation.coords.longitude);
				const locationData = {
					lat: geoLocation.coords.latitude,
					lon: geoLocation.coords.longitude,
				};

				weatherService.getCurrentWeather(locationData).then((data) => {
					console.log(data);
					setHumidity(data.main.humidity);
					setTemperature(data.main.temp);
				});

				weatherService.getCurrentRainfall(locationData).then((data) => {
					console.log("rain", data);

					setRainfall(data[0].precip);
					// setTemperature(data.current.temp);
				});
			}, failureCallback);
		}
	}, []);

	const onSubmitCropData = () => {
		const cropData = {
			N: Number(nitrogen),
			P: Number(phosphorus),
			K: Number(potassium),
			temperature: Number(temperature),
			humidity: Number(humidity),
			ph: Number(phlevel),
			rainfall: Number(rainfall),
		};

		const cropService = new CropService();
		cropService.getCrop(cropData).then((cropRec) => {
			console.log(cropRec);
			cropDisplayMessage.current.show({
				severity: "success",
				content: `${toTitleCase(
					cropRec
				)} is the best crop for your conditions.`,
				life: 240000,
			});
		});
	};
	return (
		<div className="h-full overflow-hidden">
			<Navbar/>
			<div className="bg-gray-300 border-4 h-full item-center font-sans overflow-hidden">
				<div className=" ">
					<div className="w-full h-12 rounded-md ">
					<h4 className="text-3xl text-slate-700 ml-3 font-serif p-2">Crop Selection</h4>
					</div>
					<div className="card display:block flex-col">
						<div className="grid p-2 grid-cols-3 grid-rows-3 col-span-2 gap-4 mr-1 mt-4 ">
							<div className=" bg-gradient-to-br from-gray-200 to-indigo-300 rounded-lg h-24 flex flex-col p-4 shadow-lg shadow-indigo-300/40">
								<h5 className="text-lg font-semibold">Nitrogen</h5>
								<div className="flex items-center mt-2">
									<span className=" text-gray-600 border-2 rounded-l-md px-3 py-1">
										<i class="pi pi-star"></i>
									</span>
									<input
										type="text"
										className="border w-3/4 border-gray-300 rounded-r-md px-3 py-1 ml-1 "
										placeholder="Nitrogen"
										value={nitrogen}
										onChange={(e) => setNitrogen(e.target.value)}
									/>
								</div>
							</div>

							<div className="rounded-lg bg-gradient-to-bl from-gray-200 to-indigo-300 h-24 flex flex-col p-4 shadow-lg shadow-indigo-300/40">
								<h5 className="text-lg font-semibold">Phosphorus</h5>
								<div className="flex items-center mt-2">
									<span className="text-gray-600  border-2 rounded-l-md px-3 py-1">
										<i className="pi pi-star"></i>
									</span>
									<input
										type="text"
										className="border border-gray-300 rounded-r-md px-3 py-1 ml-1 w-3/4"
										placeholder="Phosphorus"
										value={phosphorus}
										onChange={(e) => setPhosphorus(e.target.value)}
									/>
								</div>
							</div>

							<div className="bg-gradient-to-tr from-gray-200 to-indigo-300 h-24 flex flex-col rounded-lg  p-4 shadow-lg shadow-indigo-300/40">
								<h5 className="text-lg font-semibold">Potassium</h5>
								<div className="flex items-center mt-2">
									<span className=" text-gray-600 border-2 rounded-l-md px-3 py-1">
										<i className="pi pi-star"></i>
									</span>
									<input
										type="text"
										className="border border-gray-300 rounded-r-md px-3 py-1 ml-1 w-3/4"
										placeholder="Potassium"
										value={potassium}
										onChange={(e) => setPotassium(e.target.value)}
									/>
								</div>
							</div>

							<div className="bg-gradient-to-tr from-gray-200 to-indigo-300 h-24 rounded-lg flex flex-col  p-4 shadow-lg shadow-indigo-300/40">
								<h5 className="text-lg font-semibold">PH Level</h5>
								<div className="flex items-center mt-2">
									<span className=" text-gray-600 border-2 rounded-l-md px-3 py-1">
										<i className="pi pi-star"></i>
									</span>
									<input
										type="text"
										className="border border-gray-300 rounded-r-md px-3 py-1 ml-1 w-3/4"
										placeholder="PH Level"
										value={phlevel}
										onChange={(e) => setPhlevel(e.target.value)}
									/>
								</div>
							</div>

							<div className="bg-gradient-to-tl from-gray-200 to-indigo-300 rounded-lg h-24 flex flex-col p-4 shadow-lg shadow-indigo-300/40">
								<h5 className="text-lg font-semibold">Temperature</h5>
								<div className="flex items-center mt-2">
									<span className=" text-gray-600 border-2 rounded-l-md px-3 py-1">
										<i className="pi pi-sun"></i>
									</span>
									<input
										type="text"
										className="border border-gray-300 rounded-r-md px-3 py-1 ml-1 w-3/4"
										placeholder="Temperature"
										value={temperature}
										onChange={(e) => setTemperature(e.target.value)}
									/>
								</div>
							</div>

							<div className="bg-gradient-to-br from-gray-200 to-indigo-300 rounded-lg h-24 flex flex-col p-4 shadow-lg shadow-indigo-300/40">
								<h5 className="text-lg font-semibold">Humidity</h5>
								<div className="flex items-center mt-2">
									<span className=" text-gray-600 border-2 rounded-l-md px-3 py-1">
										<i className="pi pi-globe"></i>
									</span>
									<input
										type="text"
										className="border border-gray-300 rounded-r-md px-3 py-1 ml-1 w-3/4"
										placeholder="Humidity"
										value={humidity}
										onChange={(e) => setHumidity(e.target.value)}
									/>
								</div>
							</div>

							<div className="bg-gradient-to-br from-gray-200 to-indigo-300 rounded-lg h-24 flex flex-col p-4 shadow-lg shadow-indigo-300/40">
								<h5 className="text-lg font-semibold">Rainfall</h5>
								<div className="flex items-center mt-2">
									<span className=" text-gray-600 border-2 rounded-l-md px-3 py-1">
										<i className="pi pi-cloud"></i>
									</span>
									<input
										type="text"
										className="border border-gray-300 rounded-r-md px-3 py-1 ml-1 w-3/4"
										placeholder="Rainfall"
										value={rainfall}
										onChange={(e) => setRainfall(e.target.value)}
									/>
								</div>
							</div>
						</div>

						
						<div className="p-4 col-span-2 h-14 flex justify-center items-center mt-2 mr-1 ">
							<div className="border-4 rounded-md w-1/4 flex justify-center bg-gradient-to-r from-green-300 to bg-yellow-300 text-2xl">
								<button
									label="Submit Data"
									onClick={(e) => {
										e.preventDefault();
										onSubmitCropData();
									}}
									className="mr-2 mb-2 justify-center"
								>
									Recommend crop
								</button>
							</div>
						</div>
						{/* <div className="mt-4 justify-center items-center h-full flex-col"> */}
						<div class="p-4 flex justify-center items-center h-full flex-col ">
						<div class="flex justify-center items-center p-10 flex-col border-2 w-full">
							<h2 class="text-xl">Recommend Crop for cultivation is:</h2>
							<div>
								<Messages ref={cropDisplayMessage} />
							</div>
						</div>
					</div>			{/* <div className="mt-2 border-t-2">

                        </div> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Crops;
