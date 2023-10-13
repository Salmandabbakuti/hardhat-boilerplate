/*
* This script can only be run through Hardhat, and not through node directly.
* Since viem or any other hardhat plugins are globally available to Hardhat Runtime Environment. So we are not importing them explicitly.
* So when running this script through node, we will get an error saying that viem or any other plugins not defined error.
*/

const hre = require("hardhat");

async function main() {
  const [firstWalletClient] = await hre.viem.getWalletClients();
  const contract = await hre.viem.deployContract("Greeter", ["Hello, Hardhat!"], {
    walletClient: firstWalletClient, // by default, the first wallet client is used so this is optional
    // gas: 1000000,
    // value: parseEther("0.0001"),
    confirmations: 1, // 1 by default
  });
  console.log("Contract deployed at:", contract.address);
  return contract;
}

main()
  .then(async (contract) => {
    // Read from contract
    const greeting = await contract.read.getGreeting();
    console.log('Greeting from contract:', greeting);
  })
  .catch((error) => {
    console.error(error);
  });
