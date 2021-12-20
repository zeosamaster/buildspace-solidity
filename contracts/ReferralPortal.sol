// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract ReferralPortal {
    mapping(address => Referral[]) private referrals;

    event NewReferral(address indexed from, address indexed to, string skill);

    struct Referral {
        address referrer;
        string skill;
        uint256 timestamp;
    }

    function addReferral(address _referral, string memory _skill) public {
        referrals[_referral].push(
            Referral({
                referrer: msg.sender,
                skill: _skill,
                timestamp: block.timestamp
            })
        );

        emit NewReferral(msg.sender, _referral, _skill);
    }

    function getReferrals(address _referral)
        public
        view
        returns (Referral[] memory)
    {
        return referrals[_referral];
    }
}
