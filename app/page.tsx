import TwoColumnSection from "@/components/TwoColumnSection";
import HomePage from "../components/HomePage";

export default function Home() {
	const globalEcoStatsItems = [
		{
			image: "/bg2.jpg",
			heading: "Real-Time Eco Data",
			description:
				"Monitor live environmental metrics like air quality, deforestation rates, and carbon emissions.",
			link: "/dashboard",
			linkText: "Explore Data",
		},
		{
			image: "/bg2.jpg",
			heading: "Engaging Mini-Games",
			description:
				"Play games that teach you about recycling, renewable energy, and wildlife conservation.",
			link: "/games",
			linkText: "Play Now",
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
				text-transparent bg-clip-text bg-center bg-cover text-center w-full font-extrabold exo tracking-[-0.75rem]"
					style={{
						backgroundImage: "url('/bg2.jpg')",
					}}
				>
					LUMEA
				</h1>
			</div>
			{/* 			<div className="h-[100vh] w-full bg-red-700"></div>
			 */}{" "}
			<TwoColumnSection title="GLobAl EcO StATs" items={globalEcoStatsItems} />
		</div>
	);
}
