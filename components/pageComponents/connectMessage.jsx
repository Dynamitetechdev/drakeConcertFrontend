import { useMoralis } from "react-moralis";

const ConnectMessage = () => {
  const { account, chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  return (
    <div className="connectMsg absolute w-full">
      {!account ? (
        <p className="text-center bg-color-200 rounded mx-4 md:mx-16 text-white my-3 py-5">
          Please Connect Wallet. Available On Sepolia Testnet for now.
        </p>
      ) : null}
      {account && chainIdHex != 31337 ? (
        <p className="text-center bg-color-200 rounded mx-5 text-white my-3 py-5">
          Please Connect to Sepolia Testnet. Will be Avalable On Mainnet Soon.
          Test Version.
        </p>
      ) : null}
    </div>
  );
};

export default ConnectMessage;
