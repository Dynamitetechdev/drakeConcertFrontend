import ConnectMessage from "@/components/pageComponents/connectMessage";
import ContractFunctions from "@/components/contractFunctions/contractFunctions";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";
const Documents = () => {
  const {
    inputWhitelistAddress,
    setInputWhiteAddress,
    whiteListAddress,
    removeWhiteListedAddress,
    inputRemoveWhitelistAddress,
    setInputRemoveWhiteAddress,
    killContract,
    contractOwner,
    whitelistedCount,
    balance,
    handleWhiteListAddress,
    handleRemoveWhiteListAddress,
  } = ContractFunctions();
  const { account } = useMoralis();

  const handleKillContract = () => {
    try {
      killContract();
    } catch (error) {
      console.log(error.message);
    }
  };
  return contractOwner?.toLowerCase() === account?.toLowerCase() ? (
    <>
      <ConnectMessage />

      <div className="home_page h-screen w-full  py-16 md:py-24 px-5">
        <div className="inner h-full rounded-lg flex  flex-col text-white text-center">
          <div className="content flex flex-col mb-16 p-3 md:p-20">
            <h1 className="font-bold text-2xl my-3 mb-9">Admin</h1>
            <h1 className="font-bold">
              <span className="text-sm font-light">Contract Owner: </span>{" "}
              {contractOwner.slice(0, 6)}...
              {contractOwner.slice(-6)}
            </h1>
            <h1 className="font-bold">
              <span className="text-sm font-light">Contract Balance: </span>
              {balance && ethers.utils.formatUnits(balance, "ether")} ETH
            </h1>
            <h1 className="font-bold">
              <span className="text-sm font-light"> Whitelisted Address: </span>
              {whitelistedCount}
            </h1>
            <form className="forms my-12" onSubmit={handleWhiteListAddress}>
              <div className="mb-3">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Add whitelisted
                </label>
                <input
                  type="text"
                  id="base-input"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="0xad2ew...."
                  value={inputWhitelistAddress}
                  onChange={(e) => setInputWhiteAddress(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-14 rounded dark"
              >
                Whitelist Address
              </button>
            </form>

            <form
              className="forms mt-0 md:mt-16"
              onSubmit={handleRemoveWhiteListAddress}
            >
              <div className="mb-3">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Remove whitelisted
                </label>
                <input
                  type="text"
                  id="base-input"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="0xad2ew...."
                  value={inputRemoveWhitelistAddress}
                  onChange={(e) => setInputRemoveWhiteAddress(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-14 rounded dark"
              >
                Remove Address
              </button>
            </form>

            <div className="killcontract flex flex-col my-16">
              <p className="mb-2">This will kill the contract</p>
              <button
                type="submit"
                className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-14 rounded"
                onClick={handleKillContract}
              >
                Kill Contract
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="noAccess text-center">You Have No Access</div>
  );
};

export default Documents;
