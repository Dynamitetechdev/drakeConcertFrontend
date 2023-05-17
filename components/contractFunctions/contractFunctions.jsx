import { ABI, ContractAddresses } from "@/constants";
import { useEffect, useRef, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useQuery } from "@apollo/client";
import { useNotification } from "web3uikit";
import { getEndTimeEvents } from "@/constants/subgraph";

const ContractFunctions = () => {
  //================== GETTING ACCOUNT, CHAINID, CONTRACT ADDRESS ==================//
  const { account, chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = chainIdHex ? parseInt(chainIdHex).toString() : "31337";
  const lastAddress = ContractAddresses[chainId]?.length - 1;
  const contractAddress =
    chainId in ContractAddresses
      ? ContractAddresses[chainId][lastAddress]
      : null;
  const dispatch = useNotification();

  //================== STATE VARIABLES ==================//
  const [price, setPrice] = useState(null);
  const [whitelistedCount, setWhitelistedCount] = useState("0");
  const [contractOwner, setContractOwner] = useState("0x");
  const [inputWhitelistAddress, setInputWhiteAddress] = useState("");
  const [inputRemoveWhitelistAddress, setInputRemoveWhiteAddress] =
    useState("");

  const [verifyWhitelist, setVerifyWhitelist] = useState(null);
  const [endTime, setEndtime] = useState();
  const [presaleCount, setPresaleCount] = useState("0");
  const [ticketSaleCount, setTicketSaleCount] = useState("0");

  //================== SUBGRAPH INDEXS FOR EVENTS VARIABLES ==================//
  const { data: getEndTime } = useQuery(getEndTimeEvents());

  useEffect(() => {
    if (getEndTime) {
      let endTimeStamp = getEndTime.endTimeEvents[0]._endTime;
      setEndtime(endTimeStamp);
    }
  }, [getEndTime]);

  // console.log(getEndTime?.endTimeEvents[0]._endTime);

  //================== ALL FUNCTIONS ==================//
  /*
  1. getContractOwner()
  2.getTicketPrice()
  3. buyTicket()
  4. getContractBalance()
  5. whiteListAddress()
  6. removeWhiteListedAddress()
  7. isWhiteListed();
  8. killContract();
  9. getWhiteListedCount();
  */
  //======================== getOwnedDocuments ===============================//

  const { runContractFunction: getContractOwner } = useWeb3Contract({
    functionName: "getContractOwner",
    abi: ABI,
    contractAddress: contractAddress,
    params: {},
  });

  const { runContractFunction: getTicketPrice } = useWeb3Contract({
    functionName: "getTicketPrice",
    abi: ABI,
    contractAddress: contractAddress,
    params: {},
  });

  const { runContractFunction: buyTicket, error: buyTicketError } =
    useWeb3Contract({
      functionName: "buyTicket",
      abi: ABI,
      contractAddress: contractAddress,
      msgValue: price,
      params: {},
    });

  console.log("EORRRR", buyTicketError);
  const { runContractFunction: getContractBalance } = useWeb3Contract({
    functionName: "getContractBalance",
    abi: ABI,
    contractAddress: contractAddress,
    params: {},
  });

  const { runContractFunction: whiteListAddress } = useWeb3Contract({
    functionName: "whiteListAddress",
    abi: ABI,
    contractAddress: contractAddress,
    params: {
      addresses: [inputWhitelistAddress],
    },
  });
  const { runContractFunction: removeWhiteListedAddress } = useWeb3Contract({
    functionName: "removeWhiteListedAddress",
    abi: ABI,
    contractAddress: contractAddress,
    params: {
      addresses: [inputRemoveWhitelistAddress],
    },
  });

  const { runContractFunction: isWhiteListed } = useWeb3Contract({
    functionName: "isWhiteListed",
    abi: ABI,
    contractAddress: contractAddress,
    params: {
      _address: verifyWhitelist,
    },
  });

  const { runContractFunction: killContract } = useWeb3Contract({
    functionName: "killContract",
    abi: ABI,
    contractAddress: contractAddress,
    params: {},
  });

  const { runContractFunction: getWhiteListedCount } = useWeb3Contract({
    functionName: "getWhiteListedCount",
    abi: ABI,
    contractAddress: contractAddress,
    params: {},
  });
  const { runContractFunction: getPreSaleCounter } = useWeb3Contract({
    functionName: "getPreSaleCounter",
    abi: ABI,
    contractAddress: contractAddress,
    params: {},
  });
  const { runContractFunction: getTicketSaleCount } = useWeb3Contract({
    functionName: "getTicketSaleCount",
    abi: ABI,
    contractAddress: contractAddress,
    params: {},
  });

  //=================== CONTRACT FUNCTION HANDLERS ===============//
  const [balance, setBalance] = useState(0);
  const updateUI = async () => {
    const txTicketPrice = await getTicketPrice();
    const txbalance = await getContractBalance();
    const txCount = (await getWhiteListedCount()).toString();
    const txContractOwner = (await getContractOwner()).toString();
    const txPreSaleCounter = (await getPreSaleCounter()).toString();
    const txTicketSaleCount = (await getTicketSaleCount()).toString();
    setContractOwner(txContractOwner);
    setPrice(txTicketPrice);
    setBalance(txbalance);
    setWhitelistedCount(txCount);
    setPresaleCount(txPreSaleCounter);
    setTicketSaleCount(txTicketSaleCount);
  };
  // ========== handler Fucntions ============= //
  const handleBuyTicket = (e) => {
    e.preventDefault();
    buyTicket({
      onSuccess: (tx) => {
        handleSuccess(tx, "Congratulations, Ticket purchased🎉");
        updateUI();
      },
      onError: (error) => {
        if (
          error?.message.includes("Missing web3 instance, make sure to call")
        ) {
          handleFailedNotification(" Please Connect Your Wallet");
        } else if (
          error?.message.includes(
            "MetaMask Tx Signature: User denied transaction signature"
          )
        ) {
          handleFailedNotification("User Denied Tx");
        } else if (error?.data.message?.includes("reverted")) {
          handleFailedNotification("Address not whitelisted");
        }
      },
    });
  };

  const handleWhiteListAddress = async (e) => {
    e.preventDefault();
    await whiteListAddress({
      onSuccess: (tx) => {
        handleSuccess(tx, "Address whitelisted successfully");
        updateUI();
      },
      onError: (error) => {
        if (
          error.message.includes("Missing web3 instance, make sure to call")
        ) {
          handleFailedNotification(" Please Connect Your Wallet");
        } else {
          handleFailedNotification(error.message);
        }
      },
    });
    setInputWhiteAddress("");
  };
  const handleRemoveWhiteListAddress = async (e) => {
    e.preventDefault();
    await removeWhiteListedAddress({
      onSuccess: (tx) => {
        handleSuccess(tx, "Address removed from been whitelisted");
        updateUI();
      },
      onError: (error) => {
        if (
          error.message.includes("Missing web3 instance, make sure to call")
        ) {
          handleFailedNotification(" Please Connect Your Wallet");
        } else {
          handleFailedNotification(error.message);
        }
      },
    });
    setInputWhiteAddress("");
  };
  const handleKillContract = async () => {
    await killContract({
      onSuccess: (tx) => {
        handleSuccess(tx, "Contract Killed, Balance Sent To your Address");
        updateUI();
      },
      onError: (error) => {
        if (
          error.message.includes("Missing web3 instance, make sure to call")
        ) {
          handleFailedNotification(" Please Connect Your Wallet");
        } else if (
          error.message.includes(
            "MetaMask Tx Signature: User denied transaction signature"
          )
        ) {
          handleFailedNotification("User Denied Tx");
        } else if (error.data.message.includes("reverted")) {
          handleFailedNotification("Sales is not completed yet");
        }
      },
    });
  };
  const handleSuccess = async (tx, message) => {
    await tx.wait();
    await handleSuccessNotification(message);

    updateUI();
  };
  const handleSuccessNotification = async (successMessage) => {
    dispatch({
      type: "info",
      message: successMessage,
      position: "topR",
    });
    // setTransactionStatus("completed");
  };

  //=================== handleFailedNotification ===============//
  const handleFailedNotification = async (errorMessage) => {
    dispatch({
      type: "info",
      message: errorMessage,
      position: "topR",
    });
  };

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled]);

  return {
    handleBuyTicket,
    whiteListAddress,
    account,
    chainId,
    balance,
    price,
    endTime,
    whitelistedCount,
    contractOwner,
    inputWhitelistAddress,
    setInputWhiteAddress,
    removeWhiteListedAddress,
    inputRemoveWhitelistAddress,
    setInputRemoveWhiteAddress,
    verifyWhitelist,
    setVerifyWhitelist,
    handleKillContract,
    isWhiteListed,
    handleWhiteListAddress,
    handleRemoveWhiteListAddress,
    presaleCount,
    ticketSaleCount,
  };
};

export default ContractFunctions;
