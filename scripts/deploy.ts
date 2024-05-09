import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;
  const lockedAmount = ethers.parseEther("0.001");

  const contractInstance = await ethers.deployContract("Lock", [unlockTime], {
    value: lockedAmount
  });

  await contractInstance.waitForDeployment();
  return contractInstance;
}

main()
  .then(async (contractInstance) => {
    console.log("Contract deployed to:", contractInstance.target);
    // Read from the contract
    const unlockTime = await contractInstance.unlockTime();
    console.log("Unlock time:", unlockTime.toString());

    // Write to the contract
    // const tx = await contractInstance.withdraw();
    // await tx.wait();
    // console.log("Withdrawn!");
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
