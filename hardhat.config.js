require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

// defining accounts to reuse.
const accounts = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [];

task("deploy", "Deploys Contract", async () => {
  const contract = await ethers.deployContract("Greeter", ["Hello, Hardhat!"]);
  await contract.waitForDeployment();
  console.log("contract deployed at:", contract.target);
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