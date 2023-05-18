import ConnectMessage from "@/components/pageComponents/connectMessage";
import ContractFunctions from "@/components/contractFunctions/contractFunctions";
import { ethers } from "ethers";
import { useMoralis } from "react-moralis";
import Endtime from "@/components/pageComponents/endTimeCount";
import Image from "next/image";
const HomePage = () => {
  const { handleBuyTicket, price } = ContractFunctions();
  const { account } = useMoralis();
  return (
    <>
      <ConnectMessage />

      <div className="home_page w-full  py-20 md:py-30  px-2">
        <div className="inner h-full rounded-lg flex flex-col text-white items-center justify-center">
          <div className="content flex  flex-col items-center my-16 md:mt-36">
            <h1 className=" text-4xl md:text-7xl font-bold">
              Get Your <span className="text-color-500">Tickets</span>
            </h1>

            <p className="md:text-2xl font-light my-3">
              Ticket Fee:
              <span className="text-color-500 font-bold">
                {price ? ethers.utils.formatUnits(price, "ether") : "1.0"} ETH
              </span>
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-14 rounded dark"
              onClick={handleBuyTicket}
            >
              Buy Ticket
            </button>
          </div>
          <div className="count_bg flex  flex-col items-center my-16">
            <Endtime />
            <Image
              src="/images/bg.png"
              width={500}
              height={500}
              alt="ticket images"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
