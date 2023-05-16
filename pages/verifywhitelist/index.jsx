import ContractFunctions from "@/components/contractFunctions/contractFunctions";
import ConnectMessage from "@/components/pageComponents/connectMessage";
import { useState } from "react";

const Documents = () => {
  const [verifyStatus, setVerifyStatus] = useState(null);
  const { isWhiteListed, verifyWhitelist, setVerifyWhitelist } =
    ContractFunctions();

  const handleVerifyWhitelist = async (e) => {
    e.preventDefault();
    const txRes = await isWhiteListed();
    console.log(txRes);
    setVerifyStatus(txRes);
  };

  return (
    <>
      <ConnectMessage />

      <div className="home_page h-screen h-screen w-full py-16  pb-32 md:py-24 px-2">
        <div className="inner h-full rounded-lg flex flex-col text-white text-center">
          <div className="content flex flex-col mb-16 p-3 md:p-20">
            <h1 className="font-bold text-2xl my-3">Verify Address</h1>
            <p className="text-sm">Check if your address whitelisted</p>
            <form className="forms my-10" onSubmit={handleVerifyWhitelist}>
              <div className="mb-6">
                <input
                  type="text"
                  id="base-input"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-8/12 p-2.5 mx-auto"
                  placeholder="0xad2ew...."
                  value={verifyWhitelist}
                  onChange={(e) => setVerifyWhitelist(e.target.value)}
                  required
                />
                <p>{verifyStatus}</p>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-14 rounded dark"
                onClick={handleVerifyWhitelist}
              >
                Whitelist Address
              </button>

              <p className="my-16 text-4xl font-bold">
                <span className="text-sm font-light">Status:</span> <br />
                {verifyStatus == true
                  ? "Address is whitelisted"
                  : verifyStatus == false && "Not Whitelisted"}
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Documents;
