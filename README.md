# Harmony-Airdrop

Setup

Install Node.JS & NPM

https://nodejs.org/en/download/


Install dependencies

```
npm install .
```

Create a `.env` file and add the private key and harmony RPC endpoint.:

Change the amount to send.

```
# Amout to send in ONE
TO_SEND = 1.2276

HMY_PRIVATE_KEY="0x1111111111111111111111111111111111"
HMY_RPC_URL='https://api.s0.t.hmny.io'

# These should not need to be changed for Harmony ONE.
GAS_LIMIT = 25000
GAS_PRICE = 1000000000
DECIMALS= 1e18
```

Add Addresses to send to addresses.csv

run program

```
node .\do_airdrop.js
```

Save to log file 
```
node .\do_airdrop.js > ./airdrop.log
```
