require('dotenv').config()
const Web3 = require('web3')

// Open file and put addresses into a list to iterate over
var fName = 'addresses.csv'

const lineByLine = require('n-readlines')
const liner = new lineByLine(fName)

// Harmony Constants

const HMY_RPC_URL = process.env.HMY_RPC_URL
const HMY_PRIVATE_KEY = process.env.HMY_PRIVATE_KEY

const GAS_LIMIT = parseInt(process.env.GAS_LIMIT)
const GAS_PRICE = parseInt(process.env.GAS_PRICE)

const TO_SEND = process.env.TO_SEND
const DECIMALS = process.env.DECIMALS

const web3 = new Web3(HMY_RPC_URL)

let hmyMasterAccount = web3.eth.accounts.privateKeyToAccount(HMY_PRIVATE_KEY)
web3.eth.accounts.wallet.add(hmyMasterAccount)
web3.eth.defaultAccount = hmyMasterAccount.address

// # Send Tx
async function sendTX(toAddress, nonce, price) {
  const myAddress = web3.eth.defaultAccount

  console.log(
    'Send  ::  ' +
      price +
      '  ONE\nTo address  ::  ' +
      toAddress
  )

  const result = await web3.eth
    .sendTransaction({
      nonce: nonce,
      from: myAddress,
      to: toAddress,
      value: price * DECIMALS,
      gasPrice: GAS_PRICE,
      gasLimit: GAS_LIMIT,
      setTimeout: 5,
    })
    .on('error', console.error)

  console.log(
    `TX Hash  ::  ${result.transactionHash}\nResult  ::  `,
    result.status,
    '\nNonce  ::  ',
    nonce
  )
}

async function get_nonce() {
  var nonce = await web3.eth.getTransactionCount(
    hmyMasterAccount.address,
    'pending',
  )

  while (typeof nonce == 'number') {
    return nonce
  }
}

async function runAirdrop() {
  let line
  var nonce = await get_nonce()
  while ((line = liner.next())) {
    var sendAddress = line.toString('utf8').replace(/\r/g, '')
    if (web3.utils.isAddress(sendAddress)) {
      await sendTX(sendAddress, nonce, TO_SEND)
      nonce += 1
    } else {
      console.log('Invalid Address..', sendAddress)
    }
    console.log('---------------------------------------------------------------------------------------------------------')
  }
}

runAirdrop()
