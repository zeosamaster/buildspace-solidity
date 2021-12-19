// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract ReferralPortal {
    mapping(address => address[]) private referrals;

    function addReferral(address referral) public {
        referrals[referral].push(msg.sender);
        console.log("%s got a new referral from %s!", referral, msg.sender);
    }

    function getReferrals(address referral) public view returns (uint256) {
        console.log(
            "%s has a total of %d referrals!",
            referral,
            referrals[referral].length
        );
        return referrals[referral].length;
    }
}
