# Harmony-Airdrop

Setup

Install Node.JS & NPM

https://nodejs.org/en/download/


Install dependencies

```
npm install .
```

create .env file and add the private key and harmony RPC endpoint.:

```
HMY_PRIVATE_KEY="0x1111111111111111111111111111111111"
HMY_RPC_URL='https://api.s0.t.hmny.io'

GAS_LIMIT = 25000
GAS_PRICE = 1000000000

TO_SEND = 1.2276
DECIMALS= 1e18
```

Add Addresses to send to addresses.csv

run program

```
node .\do_airdrop.js
```

