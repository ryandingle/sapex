const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Deploy Web3Bank contract
  const feeRecipient = process.env.FEE_RECIPIENT || deployer.address;
  console.log("Fee recipient:", feeRecipient);

  const Web3Bank = await hre.ethers.getContractFactory("Web3Bank");
  const web3Bank = await Web3Bank.deploy(feeRecipient);

  await web3Bank.waitForDeployment();
  const address = await web3Bank.getAddress();

  console.log("Web3Bank deployed to:", address);
  console.log("Please update NEXT_PUBLIC_CONTRACT_ADDRESS in frontend/.env.local with:", address);

  // Wait for a few block confirmations before verifying
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("Waiting for block confirmations...");
    await web3Bank.deploymentTransaction()?.wait(5);
    
    try {
      await hre.run("verify:verify", {
        address: address,
        constructorArguments: [feeRecipient],
      });
    } catch (error) {
      console.log("Verification failed:", error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

