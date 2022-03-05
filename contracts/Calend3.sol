// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Calend3 {
    uint rate;

    function getRate() public view returns (uint){
        return rate; 
    }

    function setRate(uint _rate) public {
        rate = _rate;
    }
}