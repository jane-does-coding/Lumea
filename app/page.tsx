import TwoColumnSection from "@/components/TwoColumnSection";
import HomePage from "../components/HomePage";
import { MacbookScrollComponent } from "@/components/MacbookScrollComponent";

export default function Home() {
	const carbonFootprintItems = [
		{
			image: "/info1.jpg",
			heading: "Track Your Carbon Footprint",
			description:
				"Use our calculator to estimate your carbon emissions from daily activities like commuting and diet choices.",
			link: "/calculator",
			linkText: "Calculate Now",
		},
		{
			image: "/info2.jpg",
			heading: "Reduce Your Impact",
			description:
				"Discover practical tips and sustainable habits to lower your carbon footprint and live a greener life.",
			link: "/tips",
			linkText: "Learn More",
		},
	];
	return (
		<div className="">
			<div className="flex w-[85vw] xl:w-[80vw] mx-auto h-[110vh] items-center justify-center">
				<img
					src="/bg2.jpg"
					className="absolute top-0 left-0 w-full h-[110vh] z-[-1]  blur-xs opacity-80 "
					alt=""
				/>
				{/* 				<div className="absolute top-0 left-0 w-full h-[110vh] z-[-1]  bg-gradient-to-br from-sky-800/40 to-70% to-yellow-100/20"></div>
				 */}{" "}
				<div className="absolute left-0 w-full h-[110vh] z-[-1]  bg-gradient-to-b from-neutral-900/60 to-neutral-900/60 "></div>{" "}
				{/* 	<h1 className="dirtyline36 mt-[-20vh] text-[11rem] xl:text-[14rem] 2xl:text-[18rem] w-full text-neutral-50 font-extrabold leading-[11rem] xl:leading-[15rem] 2xl:leading-[18rem] tracking-[0] flex flex-col text-center items-center justify-center">
					<span className="mr-auto text-left w-full">NatURe</span>
					<span className="ml-auto text-right w-full">pUlSE</span>
				</h1> */}
				<h1
					className="absolute text-[16rem] xl:text-[22rem] 2xl:text-[26rem] leading-none 
				text-transparent bg-clip-text bg-center bg-cover text-center w-full font-extrabold exo tracking-[-0.75rem] saturate-[130%] "
					style={{
						backgroundImage: "url('/bg2.jpg')",
					}}
				>
					LUMEA
				</h1>
			</div>
			{/* 			<div className="h-[100vh] w-full bg-red-700"></div>
			 */}{" "}
			<TwoColumnSection title="CarBOn FoOTprINt" items={carbonFootprintItems} />
			<MacbookScrollComponent />
		</div>
	);
}
