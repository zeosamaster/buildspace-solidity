// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract ReferralPortal {
    mapping(address => Referral[]) private referrals;
    mapping(address => uint256) public lastWavedAt;

    event NewReferral(address indexed from, address indexed to, string skill);

    struct Referral {
        address referrer;
        string skill;
        uint256 timestamp;
    }

    uint256 private seed;

    constructor() payable {
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function addReferral(address _referral, string memory _skill) public {
        referrals[_referral].push(
            Referral({
                referrer: msg.sender,
                skill: _skill,
                timestamp: block.timestamp
            })
        );

        seed = (block.difficulty + block.timestamp + seed) % 100;

        if (lastWavedAt[msg.sender] + 5 minutes < block.timestamp) {
            lastWavedAt[msg.sender] = block.timestamp;

            if (seed <= 20) {
                uint256 prizeAmount = 0.00001 ether;
                require(
                    prizeAmount <= address(this).balance,
                    "Wallet funds depleted."
                );

                (bool success, ) = (msg.sender).call{value: prizeAmount}("");
                require(success, "Failed to send prize to referrer.");
            }
        }

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
