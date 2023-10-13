require('@nomicfoundation/hardhat-toolbox-viem');
require('dotenv').config();

// defining accounts to reuse.
const accounts = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [];

task("deploy", "Deploys Contract", async () => {
  const [firstWalletClient] = await viem.getWalletClients();
  const contract = await viem.deployContract("Greeter", ["Hello, Hardhat!"], {
    walletClient: firstWalletClient, // by default, the first wallet client is used so this is optional
    // gas: 1000000,
    // value: parseEther("0.0001"),
    confirmations: 1, // 1 by default
  });
  console.log("contract deployed at:", contract.address);
});

module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "local",
  networks: {
    local: {
      url: "http://127.0.0.1:8545",
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts
    }
  }
};