
const hre = require("hardhat");

async function main() {


  const chatApp = await hre.ethers.getContractFactory("ChatApp");
  const ChatApp = await chatApp.deploy();

  await ChatApp.deployed();

  console.log(
    `contract address:  ${"this is the contract address",ChatApp.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
