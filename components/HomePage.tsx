"use client";
import { useEffect, useState } from "react";
import Select from "react-select";
import { motion } from "framer-motion";

interface Option {
	value: string;
	label: string;
	footprint: number;
}

const transportOptions: Option[] = [
	{ value: "car", label: "Car (Gasoline)", footprint: 2.3 },
	{ value: "electric_car", label: "Electric Car", footprint: 0.7 },
	{ value: "bike", label: "Bike / Walk", footprint: 0 },
	{ value: "public_transport", label: "Public Transport", footprint: 0.5 },
];

const dietOptions: Option[] = [
	{ value: "vegan", label: "Vegan", footprint: 1.5 },
	{ value: "vegetarian", label: "Vegetarian", footprint: 1.7 },
	{ value: "omnivore", label: "Omnivore", footprint: 2.5 },
];

const housingOptions: Option[] = [
	{ value: "small_apartment", label: "Small Apartment", footprint: 1.0 },
	{ value: "medium_apartment", label: "Medium Apartment", footprint: 2.0 },
	{ value: "large_apartment", label: "Large Apartment", footprint: 3.0 },
	{ value: "small_house", label: "Small House", footprint: 3.5 },
	{ value: "medium_house", label: "Medium House", footprint: 5.0 },
	{ value: "large_house", label: "Large House", footprint: 7.0 },
];

const energyOptions: Option[] = [
	{ value: "renewable", label: "100% Renewable", footprint: 0.5 },
	{ value: "mixed", label: "Mixed Energy", footprint: 2.0 },
	{ value: "fossil", label: "Mostly Fossil Fuels", footprint: 4.0 },
];

const flightOptions: Option[] = [
	{ value: "none", label: "No flights", footprint: 0 },
	{
		value: "short_occasional",
		label: "1-2 short flights/year",
		footprint: 0.5,
	},
	{ value: "short_regular", label: "3-5 short flights/year", footprint: 1.5 },
	{ value: "long_occasional", label: "1 long flight/year", footprint: 2.0 },
	{ value: "long_regular", label: "2+ long flights/year", footprint: 4.0 },
];

const shoppingOptions: Option[] = [
	{ value: "minimal", label: "Minimalist", footprint: 0.5 },
	{ value: "average", label: "Average", footprint: 2.0 },
	{ value: "frequent", label: "Frequent Shopper", footprint: 4.0 },
];

const fadeInVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
	const [transport, setTransport] = useState<Option | null>(null);
	const [diet, setDiet] = useState<Option | null>(null);
	const [housing, setHousing] = useState<Option | null>(null);
	const [energy, setEnergy] = useState<Option | null>(null);
	const [flights, setFlights] = useState<Option | null>(null);
	const [shopping, setShopping] = useState<Option | null>(null);
	const [distance, setDistance] = useState<number>(0);
	const [result, setResult] = useState<{
		total: number;
		transportImpact: number;
		dietImpact: number;
		housingImpact: number;
		energyImpact: number;
		flightsImpact: number;
		shoppingImpact: number;
	} | null>(null);

	const [isClient, setIsClient] = useState<boolean>(false);
	useEffect(() => setIsClient(true), []);
	if (!isClient) return null;

	// Global average carbon footprint is about 4.8 tons per person per year
	const globalAverage = 4.8;
	// US average is about 16 tons
	const usAverage = 16;

	const calculateFootprint = () => {
		if (
			!transport ||
			!diet ||
			!housing ||
			!energy ||
			!flights ||
			!shopping ||
			distance <= 0
		) {
			return;
		}

		const transportImpact = (transport.footprint * distance * 365) / 1000;
		const totalFootprint =
			transportImpact +
			diet.footprint +
			housing.footprint +
			energy.footprint +
			flights.footprint +
			shopping.footprint;

		setResult({
			total: totalFootprint,
			transportImpact,
			dietImpact: diet.footprint,
			housingImpact: housing.footprint,
			energyImpact: energy.footprint,
			flightsImpact: flights.footprint,
			shoppingImpact: shopping.footprint,
		});
	};

	// Fixed percentage calculation
	const getComparisonPercentage = (userValue: number, averageValue: number) => {
		return Math.min(Math.round((userValue / averageValue) * 100), 999); // Cap at 999%
	};

	// Fixed comparison calculation
	const getComparison = (userValue: number, averageValue: number) => {
		const difference = userValue - averageValue;
		const percentage = Math.abs(Math.round((difference / averageValue) * 100));

		if (difference > 0) {
			return `${percentage}% higher than`;
		} else if (difference < 0) {
			return `${percentage}% lower than`;
		} else {
			return "equal to";
		}
	};

	return (
		<div className="w-[85vw] xl:w-[80vw] mx-auto py-[12vh]">
			<motion.h1
				className="dirtyline36 text-[3rem] xl:text-[5rem] 2xl:text-[7rem] mx-auto text-center text-black mb-[4rem]"
				variants={fadeInVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				transition={{ duration: 0.8 }}
			>
				Carbon Footprint Tracker
			</motion.h1>

			<div className="flex flex-col xl:flex-row gap-[5vw]">
				<motion.div
					className="xl:w-[50%] space-y-6"
					variants={fadeInVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					<div>
						<label className="block exo text-[1.5rem] xl:text-[1.75rem] 2xl:text-[2rem] tracking-[-1px] text-neutral-900 mb-2">
							How do you commute?
						</label>
						<Select<Option>
							options={transportOptions}
							value={transport}
							onChange={setTransport}
							className="react-select-container"
							classNamePrefix="react-select"
							styles={{
								control: (base) => ({
									...base,
									border: "2px solid #000",
									borderRadius: "9999px",
									padding: "0.5rem 1rem",
									fontSize: "1.1rem",
								}),
								option: (base) => ({
									...base,
									fontSize: "1.1rem",
								}),
							}}
						/>
					</div>

					<div>
						<label className="block exo text-[1.5rem] xl:text-[1.75rem] 2xl:text-[2rem] tracking-[-1px] text-neutral-900 mb-2">
							Daily commute distance (km)
						</label>
						<input
							type="number"
							value={distance}
							onChange={(e) => setDistance(parseFloat(e.target.value) || 0)}
							className="w-full p-4 border-2 border-black rounded-full exo text-[1.1rem]"
						/>
					</div>

					<div>
						<label className="block exo text-[1.5rem] xl:text-[1.75rem] 2xl:text-[2rem] tracking-[-1px] text-neutral-900 mb-2">
							What's your diet?
						</label>
						<Select<Option>
							options={dietOptions}
							value={diet}
							onChange={setDiet}
							className="react-select-container"
							classNamePrefix="react-select"
							styles={{
								control: (base) => ({
									...base,
									border: "2px solid #000",
									borderRadius: "9999px",
									padding: "0.5rem 1rem",
									fontSize: "1.1rem",
								}),
								option: (base) => ({
									...base,
									fontSize: "1.1rem",
								}),
							}}
						/>
					</div>

					<div>
						<label className="block exo text-[1.5rem] xl:text-[1.75rem] 2xl:text-[2rem] tracking-[-1px] text-neutral-900 mb-2">
							Your housing type?
						</label>
						<Select<Option>
							options={housingOptions}
							value={housing}
							onChange={setHousing}
							className="react-select-container"
							classNamePrefix="react-select"
							styles={{
								control: (base) => ({
									...base,
									border: "2px solid #000",
									borderRadius: "9999px",
									padding: "0.5rem 1rem",
									fontSize: "1.1rem",
								}),
								option: (base) => ({
									...base,
									fontSize: "1.1rem",
								}),
							}}
						/>
					</div>

					<div>
						<label className="block exo text-[1.5rem] xl:text-[1.75rem] 2xl:text-[2rem] tracking-[-1px] text-neutral-900 mb-2">
							Home energy source?
						</label>
						<Select<Option>
							options={energyOptions}
							value={energy}
							onChange={setEnergy}
							className="react-select-container"
							classNamePrefix="react-select"
							styles={{
								control: (base) => ({
									...base,
									border: "2px solid #000",
									borderRadius: "9999px",
									padding: "0.5rem 1rem",
									fontSize: "1.1rem",
								}),
								option: (base) => ({
									...base,
									fontSize: "1.1rem",
								}),
							}}
						/>
					</div>

					<div>
						<label className="block exo text-[1.5rem] xl:text-[1.75rem] 2xl:text-[2rem] tracking-[-1px] text-neutral-900 mb-2">
							Flight habits?
						</label>
						<Select<Option>
							options={flightOptions}
							value={flights}
							onChange={setFlights}
							className="react-select-container"
							classNamePrefix="react-select"
							styles={{
								control: (base) => ({
									...base,
									border: "2px solid #000",
									borderRadius: "9999px",
									padding: "0.5rem 1rem",
									fontSize: "1.1rem",
								}),
								option: (base) => ({
									...base,
									fontSize: "1.1rem",
								}),
							}}
						/>
					</div>

					<div>
						<label className="block exo text-[1.5rem] xl:text-[1.75rem] 2xl:text-[2rem] tracking-[-1px] text-neutral-900 mb-2">
							Shopping habits?
						</label>
						<Select<Option>
							options={shoppingOptions}
							value={shopping}
							onChange={setShopping}
							className="react-select-container"
							classNamePrefix="react-select"
							styles={{
								control: (base) => ({
									...base,
									border: "2px solid #000",
									borderRadius: "9999px",
									padding: "0.5rem 1rem",
									fontSize: "1.1rem",
								}),
								option: (base) => ({
									...base,
									fontSize: "1.1rem",
								}),
							}}
						/>
					</div>

					<button
						onClick={calculateFootprint}
						className="text-neutral-50 lowercase bg-neutral-900 mt-[2rem] px-[2rem] py-[0.75rem] text-[1.2rem] xl:text-[1.5rem] border-2 dirtyline36 transition-all font-light relative hover:bg-neutral-800/90 rounded-[10rem] w-full"
					>
						Calculate Footprint
					</button>
				</motion.div>

				{result && (
					<motion.div
						className="xl:w-[50%] bg-neutral-100 p-8 rounded-xl border-2 border-neutral-900"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<h2 className="dirtyline36 text-[2rem] xl:text-[3rem] mb-6 text-neutral-900">
							Your Results
						</h2>

						<div className="space-y-6">
							<div>
								<h3 className="exo text-[1.5rem] text-neutral-800 mb-2">
									Total Annual Carbon Footprint
								</h3>
								<p className="text-[2rem] font-bold text-neutral-900">
									{result.total.toFixed(2)} tons CO₂
								</p>
							</div>

							<div className="bg-neutral-900 h-[2px] w-full"></div>

							<div>
								<h3 className="exo text-[1.5rem] text-neutral-800 mb-2">
									Breakdown
								</h3>
								<p className="text-neutral-700">
									<span className="font-semibold">Transport:</span>{" "}
									{result.transportImpact.toFixed(2)} tons
								</p>
								<p className="text-neutral-700">
									<span className="font-semibold">Diet:</span>{" "}
									{result.dietImpact.toFixed(2)} tons
								</p>
								<p className="text-neutral-700">
									<span className="font-semibold">Housing:</span>{" "}
									{result.housingImpact.toFixed(2)} tons
								</p>
								<p className="text-neutral-700">
									<span className="font-semibold">Energy:</span>{" "}
									{result.energyImpact.toFixed(2)} tons
								</p>
								<p className="text-neutral-700">
									<span className="font-semibold">Flights:</span>{" "}
									{result.flightsImpact.toFixed(2)} tons
								</p>
								<p className="text-neutral-700">
									<span className="font-semibold">Shopping:</span>{" "}
									{result.shoppingImpact.toFixed(2)} tons
								</p>
							</div>

							<div className="bg-neutral-900 h-[2px] w-full"></div>

							<div>
								<div>
									<h3 className="exo text-[1.5rem] text-neutral-800 mb-2">
										How You Compare
									</h3>
									<p className="text-neutral-700">
										<span className="font-semibold">Global Average:</span> 4.8
										tons
										<br />
										You're {getComparison(result.total, globalAverage)} the
										global average
									</p>
									<p className="text-neutral-700 mt-2">
										<span className="font-semibold">US Average:</span> 16 tons
										<br />
										You're {getComparison(result.total, usAverage)} the US
										average
									</p>
								</div>
							</div>

							<div className="bg-neutral-900 h-[2px] w-full"></div>

							<div>
								<h3 className="exo text-[1.5rem] text-neutral-800 mb-2">
									What This Means
								</h3>
								<p className="text-neutral-700">
									Your carbon footprint measures the total greenhouse gases you
									produce through your activities. The lower your footprint, the
									better for the planet.
								</p>
								{result.total < globalAverage ? (
									<p className="text-green-600 mt-2 font-semibold">
										Excellent! You're doing better than most people worldwide.
									</p>
								) : result.total < usAverage ? (
									<p className="text-yellow-600 mt-2 font-semibold">
										You're doing better than the US average but could improve.
									</p>
								) : (
									<p className="text-red-600 mt-2 font-semibold">
										Your footprint is higher than average. Consider making
										changes.
									</p>
								)}
							</div>
						</div>
					</motion.div>
				)}
			</div>
		</div>
	);
}
