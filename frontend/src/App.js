import "./App.css";
import detectEthereumProvider from "@metamask/detect-provider";
import { useEffect, useState } from "react";
import Calendar from "./components/Calendar";

function App() {
  const [account, setAccount] = useState(false);

  //Tells React that your component needs to do something after render
  useEffect(() => {
    isConnected();
  }, []);

  const isConnected = async () => {
    const provider = await detectEthereumProvider();
    const accounts = await provider.request({ method: "eth_accounts" });

    if (accounts.length > 0) {
      setAccount(accounts[0]);
    } else {
      console.log("No authorized account found");
    }
  };

  //Will Load MetaMask
  const connect = async () => {
    try {
      const provider = await detectEthereumProvider();

      //returns an array of accounts
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });

      //check if array has at least one element
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Calend3 - The Web3 variant of Calendly</h1>
        <div id="slogan">Web3 Appointment Scheduling App</div>

        {!account && <button onClick={connect}>Connect Wallet</button>}
        {account && <Calendar account={account} />}
      </header>
    </div>
  );
}

export default App;
