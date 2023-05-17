import { useMoralis } from "react-moralis";

const ConnectMessage = () => {
  const { account, chainId: chainIdHex } = useMoralis();
  return (
    <div className=" absolute top-16 w-full">
      {!account ? (
        <p className="text-center connectMsg rounded mx-4 md:mx-16 text-white my-3 py-5">
          Please Connect Wallet. Available On Sepolia Testnet for now.
        </p>
      ) : null}
      {account && chainIdHex != 80001 ? (
        <p className="connectMsg text-center rounded mx-5 text-white my-3 py-5">
          Please Connect to Mumbai(polygon) Testnet. Will be Avalable On Mainnet
          Soon. Test Version.
        </p>
      ) : null}
    </div>
  );
};

export default ConnectMessage;
