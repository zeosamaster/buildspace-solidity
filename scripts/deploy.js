const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const referralContract = await hre.ethers.getContractFactory(
    "ReferralPortal"
  );
  const portal = await referralContract.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await portal.deployed();

  console.log("ReferralPortal address: ", portal.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
