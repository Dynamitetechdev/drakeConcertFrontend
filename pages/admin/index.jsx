import ConnectMessage from "@/components/pageComponents/connectMessage";
import ContractFunctions from "@/components/contractFunctions/contractFunctions";
import { useState } from "react";

const Documents = () => {
  const { inputWhitelistAddress, setInputWhiteAddress, whiteListAddress } =
    ContractFunctions();
  const handleWhitelisted = (e) => {
    e.preventDefault();
    whiteListAddress();
  };
  return (
    <>
      <ConnectMessage />

      <div className="allDocuments my-16">
        <h1>Admin</h1>

        <form className="">
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
            onClick={handleWhitelisted}
          >
            Register new account
          </button>
        </form>
      </div>
    </>
  );
};

export default Documents;
