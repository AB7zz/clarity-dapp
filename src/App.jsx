import React from 'react'
import './App.css'
import {
  AppConfig,
  UserSession,
  AuthDetails,
  showConnect,
} from "@stacks/connect";
import {
  AppConfig,
  UserSession,
  showConnect,
  openContractCall,
} from "@stacks/connect";
import { StacksMocknet } from "@stacks/network";
import { stringUtf8CV } from "@stacks/transactions";

const appConfig = new AppConfig(["store_write"]);
const userSession = new UserSession({ appConfig });

const appDetails = {
  name: "Counter",
  icon: "https://freesvg.org/img/1541103084.png",
};

function App() {
  const [count, setCount] = React.useState(0)
  const [userData, setUserData] = React.useState()

  const connectWallet = () => {
    showConnect({
      appDetails,
      onFinish: () => window.location.reload(),
      userSession,
    });
  };


  const handleIncCounter = async() => {
    const network = new StacksMocknet();
    const options = {
      contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      contractName: "counter",
      functionName: "increment",
      functionArgs: [],
      network,
      appDetails,
      onFinish: ({ txId }) => console.log(txId),
    }
    await openContractCall(options);
    setCount(count => count+1)
  }

  const handleDecCounter = async() => {
    const network = new StacksMocknet();
    const options = {
      contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      contractName: "counter",
      functionName: "decrement",
      functionArgs: [],
      network,
      appDetails,
      onFinish: ({ txId }) => console.log(txId),
    }
    await openContractCall(options);
    setCount(count => count-1)
  }

  React.useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, []);

  return (
    <>
      <h1>Clarity-Stacks-Counter</h1>
      {!userData && (
        <button
          className="p-4 bg-indigo-500 rounded text-white"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )
      }
      {userData && <div className="card">
        <span>{count}</span>
        <button onClick={handleIncCounter}>
          +
        </button>
        <button onClick={handleDecCounter}>
          -
        </button>
      </div>}
    </>
  )
}

export default App
