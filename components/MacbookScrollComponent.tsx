import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import Link from "next/link";

export function MacbookScrollComponent() {
	return (
		<div className="overflow-hidden bg-white w-full">
			<MacbookScroll
				title={
					<span className="flex flex-col gap-3 text-center justify-center items-center ">
						Check your own Carbon Footprint <br />{" "}
						<a
							href="/calculate"
							className="text-white bg-black rounded-full px-12 py-2 text-[1.5rem] w-fit"
						>
							Calculate
						</a>
					</span>
				}
				src={`/lumea.png`}
				showGradient={false}
			/>
		</div>
	);
}
