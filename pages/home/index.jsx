import ConnectMessage from "@/components/pageComponents/connectMessage";
import ContractFunctions from "@/components/contractFunctions/contractFunctions";
import { ethers } from "ethers";
import { useMoralis } from "react-moralis";
import Endtime from "@/components/pageComponents/endTimeCount";
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
      {/* <ConnectMessage /> */}

      <div className="allDocuments">
        <Endtime />
        <h1>
          Ticket Fee: {price && ethers.utils.formatUnits(price, "ether")} ETH
        </h1>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleBuyTicket}
        >
          Buy Ticket
        </button>
      </div>
    </>
  );
};

export default HomePage;
