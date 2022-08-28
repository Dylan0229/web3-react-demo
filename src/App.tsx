import { injected, bscConnector } from "./connectors";
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";

function App() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  async function connect() {
    try {
      activate(injected);
      localStorage.setItem("isWalletConnected", "true");
    } catch (err) {
      console.log(err);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", "false");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const connectWalletOnLoad = async () => {
      if (localStorage.getItem("isWalletConnected")) {
        try {
          await activate(injected);
          localStorage.setItem("isWalletConnected", "true");
        } catch (err) {
          console.log(err);
        }
      }
    };
    connectWalletOnLoad();
  }, []);


  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={connect}
        className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800"
      >
        Connect to wallet
      </button>
      {active ? (
        <span>
          Connected with <b>{account}</b>
        </span>
      ) : (
        <span>Not connected</span>
      )}
      <button
        onClick={disconnect}
        className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800"
      >
        Disconnect
      </button>
    </div>
  );
}

export default App;
