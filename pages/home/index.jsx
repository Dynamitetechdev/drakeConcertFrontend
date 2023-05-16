import ConnectMessage from "@/components/pageComponents/connectMessage";
import ContractFunctions from "@/components/contractFunctions/contractFunctions";
import { ethers } from "ethers";
import { useMoralis } from "react-moralis";
import Endtime from "@/components/pageComponents/endTimeCount";
import Image from "next/image";
const HomePage = () => {
  const { handleBuyTicket, price } = ContractFunctions();
  const { account } = useMoralis();
  const buyTicketFunc = async () => {
    try {
      console.log("Hellllo");
      await buyTicket();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ConnectMessage />

      <div className="home_page h-screen w-full  py-20 md:py-24 px-5">
        <div className="inner h-full rounded-lg flex flex-col text-white items-center justify-center">
          <div className="content flex  flex-col items-center my-16">
            <h1 className=" text-4xl md:text-7xl font-bold">
              Get Your Tickets
            </h1>
            <p className="md:text-2xl font-light my-3">
              Ticket Fee: {price && ethers.utils.formatUnits(price, "ether")}{" "}
              ETH
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
            <Image src="/images/bg.png" width={500} height={500} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
