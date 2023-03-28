// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Counter {
    uint256 public number;

    event NumberIncremented(
        uint256 indexed oldNumber,
        uint256 newNumber,
        address sender
    );
    event NumberChanged(
        uint256 indexed oldNumber,
        uint256 newNumber,
        address sender
    );

    function setNumber(uint256 newNumber) public {
        uint256 oldNumber = number;
        number = newNumber;
        emit NumberChanged(oldNumber, newNumber, msg.sender);
    }

    function increment() public {
        number++;
        emit NumberIncremented(number - 1, number, msg.sender);
    }
}
