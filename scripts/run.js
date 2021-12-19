const main = async () => {
  const [owner, referral, referrer1, referrer2] = await hre.ethers.getSigners();
  const referralContractFactory = await hre.ethers.getContractFactory(
    "ReferralPortal"
  );
  const referralContract = await referralContractFactory.deploy();
  await referralContract.deployed();

  console.log("Contract deployed to:", referralContract.address);
  console.log("Contract deployed by:", owner.address);

  await referralContract.getReferrals(referral.address);

  let referralTxn = await referralContract
    .connect(referrer1)
    .addReferral(referral.address);
  await referralTxn.wait();

  await referralContract.getReferrals(referral.address);

  referralTxn = await referralContract
    .connect(referrer2)
    .addReferral(referral.address);
  await referralTxn.wait();

  await referralContract.getReferrals(referral.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
