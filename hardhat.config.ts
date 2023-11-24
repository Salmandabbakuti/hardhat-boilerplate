import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const accounts = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [];

// https://hardhat.org/guides/create-task.html
task(
  "accounts",
  "Prints the list of accounts with balances",
  async (_, hre) => {
    const accounts = await hre.ethers.getSigners();
    const provider = hre.ethers.provider;

    for (const account of accounts) {
      const balance = await provider.getBalance(account.address);
      console.log(
        `${account.address} - ${hre.ethers.formatEther(balance)} ETH`
      );
    }
  }
);

task("deploy", "Deploys Contract", async (_, hre) => {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 365 * 24 * 60 * 60; // 1 year from now
  const lockedAmount = hre.ethers.parseEther("0.001");

  const lockInstance = await hre.ethers.deployContract("Lock", [unlockTime], {
    value: lockedAmount
  });

  await lockInstance.waitForDeployment();
  console.log("contract deployed at:", lockInstance.target);
});

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async ({ account }, hre) => {
    const provider = hre.ethers.provider;
    const balance = await provider.getBalance(account);
    console.log(hre.ethers.formatEther(balance), "ETH");
  });

const config: HardhatUserConfig = {
  defaultNetwork: "local",
  networks: {
    hardhat: {
      chainId: 1337
    },
    local: {
      url: "http://127.0.0.1:8545"
    },
    mumbai: {
      url:
        process.env.POLYGON_MUMBAI_RPC_URL ||
        "https://rpc-mumbai.maticvigil.com",
      accounts
    },
    polygon: {
      url:
        process.env.POLYGON_MAINNET_RPC_URL ||
        "https://rpc-mainnet.maticvigil.com",
      accounts
    }
  },
  etherscan: {
    // API key for Polygonscan
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  gasReporter: {
    enabled: true,
    currency: "USD"
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

export default config;
