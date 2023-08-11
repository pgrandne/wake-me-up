import { Countdown } from "../components/Countdown";
export const Card = () => {
	return (
		<div className="container flex mx-auto my-auto w-full items-center justify-center">
			<ul className="flex flex-col bg-gray-300 p-4">
				
                <li className="border-gray-400 flex flex-row mb-2">
					<div className="bg-gray-200 select-none cursor-pointer  rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
						<div className=" flex flex-1 items-center p-4  ">
							<div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">
								💧
							</div>
							<div className="flex-1 pl-1 mr-16">
								<div className="font-medium">Cup of water</div>
								<div className="text-gray-600 text-sm">200ml</div>
							</div>
							<div className="text-gray-600 text-xs">6:00 AM</div>
						</div>
						<div className="flex justify-center">
							<Countdown date={new Date("12/08/2023 06:00:00")}></Countdown>
						</div>
					</div>
				</li>
                <li className="border-gray-400 flex flex-row mb-2">
					<div className="bg-gray-200 select-none cursor-pointer  rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg w-full">
						<div className=" flex flex-1 items-center p-4  ">
							<div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">
                            ⚽️
							</div>
							<div className="flex-1 pl-1 mr-16">
							<div className="font-medium">Training            </div>
							<div className="text-gray-600 text-sm">1h</div>
						</div>
						<div className="text-gray-600 text-xs">10:00 AM</div>
						</div>
						<div className="flex justify-center">
							<Countdown date={new Date("12/08/2023 10:00:00")}></Countdown>
						</div>
					</div>
				</li>
                <li className="border-gray-400 flex flex-row mb-2">
					<div className="bg-gray-200 select-none cursor-pointer  rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg w-full">
						<div className=" flex flex-1 items-center p-4  ">
                        <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">
							📖
						</div>
						<div className="flex-1 pl-1 mr-16">
							<div className="font-medium">Study</div>
							<div className="text-gray-600 text-sm">4h</div>
						</div>
						<div className="text-gray-600 text-xs">1:00 PM</div>
						</div>
						<div className="flex justify-center">
							<Countdown date={new Date("12/08/2023 13:00:00")}></Countdown>
						</div>
					</div>
				</li>
			</ul>
		</div>
	);
};
