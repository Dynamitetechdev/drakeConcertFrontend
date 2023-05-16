import { ABI, ContractAddresses } from "@/constants";
import { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useQuery } from "@apollo/client";
import { useNotification } from "web3uikit";

const ContractFunctions = () => {
  //================== SUBGRAPH INDEXS FOR EVENTS VARIABLES ==================//
  // const { data: uploadDocumentEvent, refetch } = useQuery(
  //   getDocumentUploadeds()
  // );

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
  const [endTime, setEndtime] = useState("0");

  //================== ALL FUNCTIONS ==================//
  /*
  1. getOwnedDocuments()
  2.uploadDocument()
  3. checkDocumentExistence()
  4. getDocumentById()
  5. transferDocumentOwnership()
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

  const { runContractFunction: buyTicket } = useWeb3Contract({
    functionName: "buyTicket",
    abi: ABI,
    contractAddress: contractAddress,
    msgValue: price,
    params: {},
  });

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

  const { runContractFunction: getEndTime } = useWeb3Contract({
    functionName: "getEndTime",
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

    const txGetEndTime = (await getEndTime()).toString();
    localStorage.setItem("endtime", txGetEndTime);
    console.log("txGetEndTime", txGetEndTime);
    setContractOwner(txContractOwner);
    setPrice(txTicketPrice);
    setBalance(txbalance);
    setWhitelistedCount(txCount);
    setEndtime(txGetEndTime);
    console.log("xxxxxx", txGetEndTime);
  };
  console.log("shjnfkdjfd", endTime);
  // ========== handler Fucntions ============= //

  const handleBuyTicket = (e) => {
    e.preventDefault();
    buyTicket({
      onSuccess: (tx) => {
        handleSuccess(tx, "Congratulations, Ticket purchased🎉");
        updateUI();
      },
      onError: (error) => {
        handleFailedNotification(error.message);
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
        handleFailedNotification(error.message);
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
        handleFailedNotification(error.message);
      },
    });
    setInputWhiteAddress("");
  };
  const handleSuccess = async (tx, message) => {
    await tx.wait();
    await handleSuccessNotification(message);

    updateUI();
  };

  const handleSuccessViewfunctions = async (message) => {
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

  //=================== 5. handleFailedNotification ===============//
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
    killContract,
    isWhiteListed,
    getEndTime,
    handleWhiteListAddress,
    handleRemoveWhiteListAddress,
  };
};

export default ContractFunctions;
