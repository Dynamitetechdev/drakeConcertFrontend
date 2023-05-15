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

  const { runContractFunction: getWhiteListedCount } = useWeb3Contract({
    functionName: "getWhiteListedCount",
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
    setContractOwner(txContractOwner);
    setPrice(txTicketPrice);
    setBalance(txbalance);
    setWhitelistedCount(txCount);
  };
  //=================== 2. handleUploadDocument ===============//

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
    setTransactionStatus("completed");
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
    buyTicket,
    whiteListAddress,
    account,
    chainId,
    balance,
    price,
    whitelistedCount,
    contractOwner,
    inputWhitelistAddress,
    setInputWhiteAddress,
  };
};

export default ContractFunctions;
