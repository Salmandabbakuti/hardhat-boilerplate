require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-chai-matchers');
require("@nomiclabs/hardhat-solhint");
require('dotenv').config();

// defining accounts to reuse.
const accounts = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [];

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("hello", "Prints Hello World", () => console.log("Hello World!"));

task("accounts", "Prints the list of accounts with balances", async () => {
  const accounts = await ethers.getSigners();
  const provider = await ethers.provider;

  for (const account of accounts) {
    const balance = await provider.getBalance(account.address);
    console.log(`${account.address} - ${ethers.formatEther(balance)} ETH`);
  }
});

task("deploy", "Deploys Contract", async () => {
  const contract = await ethers.deployContract("Greeter", ["Hello, Hardhat!"]);
  await contract.waitForDeployment();
  console.log("contract deployed at:", contract.target);
});

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async ({ account }) => {
    const provider = await ethers.provider;
    const balance = await provider.getBalance(account);
    console.log(ethers.formatEther(balance), "ETH");
  });


module.exports = {
  defaultNetwork: "local",
  networks: {
    hardhat: {
      chainId: 1337
    },
    local: {
      url: "http://127.0.0.1:8545",
    },
    mumbai: {
      url: process.env.POLYGON_MUMBAI_RPC_URL || "https://rpc-mumbai.maticvigil.com",
      accounts
    },
    polygon: {
      url: process.env.POLYGON_MAINNET_RPC_URL || "https://rpc-mainnet.maticvigil.com",
      accounts
    }
  },
  etherscan: {
    // API key for Polygonscan
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
  },
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
};