# hardhat-boilerplate

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts with balances.

> Recommended to use Node.js v14+ and npm v7+.

> Rename `env.example` to `.env` and add your env specific keys.

Try running some of the following tasks:

```shell
npm install

# starts local node
npx hardhat node

# list accounts with balances
npx hardhat accounts

# show balance eth of specified account
npx hardhat balance --account '0x47a9...'

# compile contracts
npx hardhat compile

# deploy contract defined in tasks on specified network
npx hardhat deploy --network local

# deploy contract in scripts/deploy.js on specified network
npx hardhat run scripts/deploy.js --network local

#check linter issues using solhint plugin
npx hardhat check

# check coverage using solidity-coverage plugin: supports hardhat network only
npx hardhat coverage --network hardhat

# unit tests including gas usage
npx hardhat test

# remove all compiled and deployed artifacts
npx hardhat clean

# verify contract
npx hardhat verify --network <deployed network> <deployed contract address> "<constructor1>" "<constructor2>"

# show help
npx hardhat help
```
