# Hardhat Boilerplate(Minimal)

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts with balances.

## Getting Started

> Recommended to use Node.js v18+ and npm v8+

Try running some of the following tasks:

```bash
npm install

# Set/Read/Remove hardhat config variables
# npx hardhat vars set API_KEY
# npx hardhat vars get API_KEY
# npx hardhat vars DELETE API_KEY
# npx hardhat vars list

# set PRIVATE_KEY
npx hardhat vars set PRIVATE_KEY


# starts local node
npx hardhat node

# compile contracts
npx hardhat compile

# deploy contract in scripts/deploy.ts on specified network
npx hardhat run scripts/deploy.ts --network localhost

# verify contract
npx hardhat verify --network <deployed network> <deployed contract address> "<constructor1>" "<constructor2>"

# check coverage using solidity-coverage plugin: supports hardhat network only
npx hardhat coverage --network hardhat

# unit tests including gas usage
npx hardhat test

# remove all compiled and deployed artifacts
npx hardhat clean

# show help
npx hardhat help
```

## Change Log

#### v1.2.3

- Replaced deprecated mumbai network with amoy network in `hardhat.config.ts`
- Compiler version updated to `0.8.24`
- Hardhat deps update
- Generalized `deploy.ts` script for any contract with minimal changes
- README.md sections update

## References

- [Hardhat](https://hardhat.org/)
- [Hardhat Docs](https://hardhat.org/getting-started/)
- [Ethers.js](https://docs.ethers.io/v5/)
- [Solidity](https://docs.soliditylang.org/en/v0.8.25/)

## Safety

This is experimental software and subject to change over time.

This is a proof of concept and is not ready for production use. It is not audited and has not been tested for security. Use at your own risk. I do not give any warranties and will not be liable for any loss incurred through any use of this codebase.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
