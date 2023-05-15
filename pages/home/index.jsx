import ConnectMessage from "@/components/pageComponents/connectMessage";
import ContractFunctions from "@/components/contractFunctions/contractFunctions";
import { ethers } from "ethers";
import { useMoralis } from "react-moralis";
const HomePage = () => {
  const {
    buyTicket,
    whiteListAddress,
    chainId,
    balance,
    price,
    whitelistedCount,
    contractOwner,
  } = ContractFunctions();
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
        <h1>Contract Owner: {contractOwner}</h1>
        <h1>Connected Account: {account}</h1>
        <h1>
          Contract Balance:{" "}
          {balance && ethers.utils.formatUnits(balance, "ether")}
        </h1>
        <h1>Whitelisted Address: {whitelistedCount}</h1>
        <h1>
          Ticket Fee: {price && ethers.utils.formatUnits(price, "ether")} ETH
        </h1>
        <h1>Buy Ticket</h1>
        <button
          cl="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={buyTicketFunc}
        >
          Button
        </button>
      </div>
    </>
  );
};

export default HomePage;
