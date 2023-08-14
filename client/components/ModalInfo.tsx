import { Dispatch, SetStateAction } from 'react';

export const ModalInfo = ({ setModalInfo }: { setModalInfo: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
            <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
            <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
                <div className="">
                    <div className="text-center p-5 flex-auto justify-center">
                        <h2 className="text-xl font-bold py-4 ">Wake Me Up!</h2>
                        <p className="text-sm text-gray-500 px-8">Wake up every morning to get back your money, if you don't wake up, your money is sent to SBF!<br />
                            This project helps you to wake up the morning:<br />
                            1. First you deposit some eth into a smart contract<br />
                            2. Then you define a wake up time<br />
                            3. Every day if you wake up before this time, you can claim a part of your deposit, if not this money is sent to Sam Bankman-Fried from FTX<br />
                            4. If you wake up 10 times in a row before your defined time, you can mint a NFT as gift/proof<br />
                        </p>
                    </div>
                    <div className="p-3  mt-2 text-center space-x-4 md:block">
                        <button
                            className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                            onClick={() => setModalInfo(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )

}