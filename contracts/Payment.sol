// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";


contract Payment{

    using Counters for Counters.Counter;
    Counters.Counter public totalUser;

    address public Owner;

    struct users{
        address userAdd;
        uint256 amount;
        bool paid;
    }
    // mapping (uint256=> address payable) private users;
    mapping (address => users) private userDetails;
    uint256 public price = 1 ether;

    constructor () { 
        Owner = msg.sender; 
    }

    modifier onlyOwner {
      require(msg.sender == Owner);
      _;
   }


    function payout(address payable _userAdd, uint256 _amount) public payable onlyOwner returns(bool) {
        _userAdd.transfer(_amount*price);

        userDetails[_userAdd].userAdd = _userAdd;
        userDetails[_userAdd].amount = _amount; 
        userDetails[_userAdd].paid = true;

        totalUser.increment();

        return userDetails[_userAdd].paid;
    }

    // function getPaymentDetails() public view returns( uint256 ){
    //     return amount[msg.sender];
    // }
    
    // function payout() payable public{
    //     for(uint256 i=0; i<totalUser.current(); i++){
    //         (users[i]).transfer(amount[users[i]]*price);
    //     }
    // }

}
