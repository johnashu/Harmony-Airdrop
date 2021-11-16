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

HMY_PRIVATE_KEY="0x1111111111111111111111111111111111"
HMY_RPC_URL='https://api.harmony.one'
# HMY_RPC_URL='https://api.s0.b.hmny.io'

# these should not need to be changed.
GAS_LIMIT=250000
GAS_PRICE=1000000000

# Amount to send
TO_SEND=0.12342276

# Choose ONE or HRC20
TOKEN_TYPE=HRC20
HRC20Contract=0xd6D5936f9323C6Fd8C578d10E1A6A9C63A308D85

# Normally 18 on Harmony.
DECIMALS=18

```

Add Name & Addresses to send to addresses.csv

i.e.
Maffaz,0xF88b361E05a504D9ef34FFeE0E6A5137eba219ca
Jimmy,0xF88b361E05a504D9ef34FFeE0E6A5137eba1b2b3
...

run program

```
node .\do_airdrop.js
```

Save to log file 
```
node .\do_airdrop.js > ./airdrop.log
```
