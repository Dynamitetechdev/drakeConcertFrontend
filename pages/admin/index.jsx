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

  const handleWhitelisted = (e) => {
    e.preventDefault();
    whiteListAddress();
  };

  const handleRemoveWhitelisted = (e) => {
    e.preventDefault();
    removeWhiteListedAddress();
  };

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

      <div className="allDocuments my-16">
        <h1>Admin</h1>
        <h1>Contract Owner: {contractOwner}</h1>
        <h1>Connected Account: {account}</h1>
        <h1>
          Contract Balance:{" "}
          {balance && ethers.utils.formatUnits(balance, "ether")}
        </h1>
        <h1>Whitelisted Address: {whitelistedCount}</h1>
        <form className="forms" onSubmit={handleWhiteListAddress}>
          <h1>Add whitelisted</h1>
          <div className="mb-6">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="text"
              id="base-input"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="0xad2ew...."
              value={inputWhitelistAddress}
              onChange={(e) => setInputWhiteAddress(e.target.value)}
              required
            />
            <p>{inputWhitelistAddress}</p>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Whitelist Address
          </button>
        </form>

        <form className="forms mt-16" onSubmit={handleRemoveWhiteListAddress}>
          <h1>Remove whitelisted</h1>
          <div className="mb-6">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="text"
              id="base-input"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="0xad2ew...."
              value={inputWhitelistAddress}
              onChange={(e) => setInputWhiteAddress(e.target.value)}
              required
            />
            <p>{inputRemoveWhitelistAddress}</p>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Remove Address
          </button>
        </form>

        <div className="killcontract flex justify-center">
          <h1> Kill Contract </h1>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleKillContract}
          >
            Kill Contract
          </button>
        </div>
      </div>
    </>
  ) : (
    <div className="noAccess text-center">You Have No Access</div>
  );
};

export default Documents;
