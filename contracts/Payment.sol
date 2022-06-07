// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/utils/Counters.sol";


contract Payment{

    using Counters for Counters.Counter;
    Counters.Counter private totalUser;

    mapping (uint256=> address payable) private users;
    mapping (address => uint256) private amount;
    uint256 public price = 1 ether;

    function addPaymentDetails(address payable userAdd, uint256 _amount) public {
        users[totalUser.current()] = userAdd;
        amount[msg.sender] = _amount; 
        totalUser.increment();
    }

    function getPaymentDetails() public view returns( uint256 ){
        return amount[msg.sender];
    }

    function payout() payable public{
        for(uint256 i=0; i<totalUser.current(); i++){
            (users[i]).transfer(amount[users[i]]*price);
        }
    }


}
