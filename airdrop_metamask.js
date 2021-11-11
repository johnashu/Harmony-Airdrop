require('dotenv').config()
const detectEthereumProvider = require('@metamask/detect-provider');
const Web3 = require('web3')
const BN = require('bn.js');
const numFormat = require('./utils/numberFormat');


// Open file and put addresses into a list to iterate over
var fName = 'addresses.csv'

const lineByLine = require('n-readlines')
const liner = new lineByLine(fName)

// Metamask

let account;
let isAuthorised = false;
const handleAccountsChanged = (accounts) => {
  if (accounts.length === 0) {
    console.error('Not found accounts');
  } else {
    account = accounts[0];
    
    console.log('Your address: ', account);
  }
}
const signInMetamask = async () => {
    const provider = await detectEthereumProvider();
    // @ts-ignore
    if (provider !== window.ethereum) {
      console.error('Do you have multiple wallets installed?');
    }
    if (!provider) {
      console.error('Metamask not found');
      return;
    }
    
    // MetaMask events
    provider.on('accountsChanged', handleAccountsChanged);
    provider.on('disconnect', () => {
      console.log('disconnect');
      isAuthorised = false;
    });
    
    provider.on('chainIdChanged', chainId => console.log('chainIdChanged', chainId));
    provider
      .request({ method: 'eth_requestAccounts' })
      .then(async params => {
        handleAccountsChanged(params);
        isAuthorised = true;
      })
      .catch(err => {
        isAuthorised = false;
        
        if (err.code === 4001) {
          console.error('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });
}


web3 = new Web3(window.web3.currentProvider) 
/* provider will use network RPC, wich was selected in MetaMask */

const accounts = ethereum.enable();    
/* Now any request to sign a transaction will be redirected to MetaMask */

// # Send Tx
async function sendTxOne(toAddress, price) {

  console.log(
    'Send  ::  ' +
      price +
      '  ONE\nTo address  ::  ' +
      toAddress
  )

  const web3 = new Web3(window.ethereum);

  if (web3.utils.isAddress(toAddress)) {    
    
  const gas = 6721900;
  const gasPrice = new BN(await web3.eth.getGasPrice()).mul(new BN(1));
  
  const result = await web3.eth
    .sendTransaction({
      from: account,
      to: toAddress,
      value: price * 1e18, 
      gasPrice,
      gas,
    })
    .on('error', console.error);
  console.log(`Send tx: ${result.transactionHash} result: `, result.status);

  console.log(
    `TX Hash  ::  ${result.transactionHash}\nResult  ::  `,
    result.status,

  )
} else {
  console.log('Invalid Address..', toAddress)
}

var TO_SEND = 1 

async function runAirdrop() {
  let line
  while ((line = liner.next())) {
    var sendAddress = line.toString('utf8').replace(/\r/g, '')
      await sendTxOne(sendAddress, TO_SEND)
    }
    console.log('---------------------------------------------------------------------------------------------------------')
  }
}


runAirdrop()
