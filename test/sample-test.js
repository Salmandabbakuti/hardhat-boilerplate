/*
* This script can only be run through Hardhat, and not through node directly.
* Since ethers or any other hardhat plugins are globally available to Hardhat Runtime Environment. So we are not importing them explicitly.
* So when running this script through node, we will get an error saying that ethers or any other plugins not defined error.
*/
const hre = require("hardhat");
const { expect } = require("chai");

describe("Contract Tests", function () {
  let walletClients;
  let publicClient;
  let greeterContract;

  // `before` will run only once, useful for deploying the contract and use it on every test
  // It receives a callback, which can be async.
  before(async () => {
    publicClient = await hre.viem.getPublicClient();
    walletClients = await hre.viem.getWalletClients();
    const [firstWalletClient] = walletClients;
    greeterContract = await hre.viem.deployContract("Greeter", ["Hello, Hardhat!"], {
      walletClient: firstWalletClient, // by default, the first wallet client is used so this is optional
      // gas: 1000000,
      // value: parseEther("0.0001"),
      confirmations: 1, // 1 by default
    });
    console.log("contract deployed at:", greeterContract.address);
  });

  it("Should return the new greeting once it's changed", async function () {
    expect(await greeterContract.read.getGreeting()).to.equal("Hello, Hardhat!");
    const setGreetingTxHash = await greeterContract.write.setGreeting(["Hola, mundo!"]);
    // wait for the transaction to be mined
    await publicClient.waitForTransactionReceipt({
      hash: setGreetingTxHash,
    });
    expect(await greeterContract.read.getGreeting()).to.equal("Hola, mundo!");
  });
});
