import { useEffect, useState } from 'react';
import './App.css';
import { abiClassic } from './abiClassic.js'
import classicLogo from './assets/classicLogo.png'
import optimismLogo from './assets/optimism-ethereum-op-logo.png'
import ethereumLogo from './assets/ethereum-eth-logo.png'
const { BigNumber, parseEther } = require('ethers');
const { ethers } = require('ethers');
// const CONTRACT_ADDRESS = '0xF58a567010753CEd2158bA6e72Ef2F8Fb7AA9513' //crowdsale contract sepolia
//const CONTRACT_ADDRESS = '0xB7fB08F92378E19aE606f7EBfB155d9E3bEaD928' //crowdsale contract OPtimism sepolia
const CONTRACT_ADDRESS = '0xf4096004baaa0C79685145b76109f2c220a01C4E'
function App() {
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);
  const [amount, setAmount] = useState(0)

  useEffect(() => {
      const onLoad = async () => {
       if (window.ethereum) {
                try {
                    window.ethereum.on('chainChanged', () => {
   window.location.reload();
})
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        
        setProvider(provider);
 } catch (error) {
                    //console.error('Wallet connection error:', error);
                    //alert('Wallet connection error: ' + error.message);
                }
            } else {
                //alert('Please install MetaMask or another Ethereum wallet to use this feature.');
            }
      
        const contract = await new ethers.Contract(
          CONTRACT_ADDRESS,
          abiClassic,
          provider
        );
        setContract(contract);
      }
        onLoad()
     
  }, [])

  const getSigner = async provider => {
    const signer = provider.getSigner();
    signer.getAddress()
      .then((address) => {
        setSignerAddress(address);
      })

    return signer;
  };
  
  const connect = async () => {
      await provider.send('eth_requestAccounts', []); // <- this promps user to connect metamask
    getSigner(provider)
      .then(signer => {
        setSigner(signer)
    })
}
  const isConnected = () => (signer !== undefined)
  const toWei = ether => ethers.utils.parseEther(ether);
    
  const buyTokens = async () => {
       const wei = toWei(amount)
    await contract.connect(signer).buyTokens(signerAddress, {value: wei})
  }

  return (
    <div className="App">
      <div className="App-header">
        {isConnected() ? (
          <div>
            <p>
              Connected: {signerAddress?.substring(0,8)}...<br/>
              Choose <img src={optimismLogo} alt="optimism-logo"  className="networktoken"/>Optimism network <br />
            </p>
            <div className="list-group">
              <div className="list-group-item">
                <div className="row py-3">

                  <div className="col-md-2">
                    <img
            src={classicLogo}
            alt="ClassisFoto"
            className="logotoken"
          />
                  </div>
                  <div className="col-md-4">
                    <input
                      className="inputField"
                      placeholder="0.0"
                      onChange={e => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="d-flex gap-4 col-md-3">
                    CLASS
                  </div>

                  <div className="d-flex gap-4 col-md-2">
                    <button
                      className="btn btn-success"
                      onClick={() => buyTokens()}>
                      Buy
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p>
            Pay with<img src={ethereumLogo} alt="ethereum-logo"  className="networktoken"/>Ethereum<br />
            on <img src={optimismLogo} alt="optimism-logo"  className="networktoken"/>Optimism network</p>
            <button onClick={() => connect()} className="btn btn-primary">Connect</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
