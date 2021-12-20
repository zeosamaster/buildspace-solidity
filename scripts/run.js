const TEST_SKILL_1 = "solidity";
const TEST_SKILL_2 = "javascript";

const logReferrals = async (referralContract, address) => {
  const referrals = await referralContract.getReferrals(address);
  console.log(`${address} has ${referrals.length} referrals`);

  const skills = referrals.reduce((res, { skill }) => {
    return {
      ...res,
      [skill]: (res[skill] || 0) + 1,
    };
  }, {});
  console.log("Current skills are", JSON.stringify(skills));
};

const main = async () => {
  const [owner, referral, referrer1, referrer2] = await hre.ethers.getSigners();
  const referralContractFactory = await hre.ethers.getContractFactory(
    "ReferralPortal"
  );
  const referralContract = await referralContractFactory.deploy();
  await referralContract.deployed();

  console.log("Contract deployed to:", referralContract.address);
  console.log("Contract deployed by:", owner.address);

  await logReferrals(referralContract, referral.address);

  let referralTxn = await referralContract
    .connect(referrer1)
    .addReferral(referral.address, TEST_SKILL_1);
  await referralTxn.wait();

  await logReferrals(referralContract, referral.address);

  referralTxn = await referralContract
    .connect(referrer2)
    .addReferral(referral.address, TEST_SKILL_1);
  await referralTxn.wait();

  await logReferrals(referralContract, referral.address);

  referralTxn = await referralContract
    .connect(referrer2)
    .addReferral(referral.address, TEST_SKILL_2);
  await referralTxn.wait();

  await logReferrals(referralContract, referral.address);
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
