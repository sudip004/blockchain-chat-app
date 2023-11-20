
const hre = require("hardhat");

async function main() {
  
  const ChatApp = await hre.ethers.deployContract("ChatApp")
  await ChatApp.waitForDeployment();

  console.log(`deploy successfully address => ${ChatApp.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
