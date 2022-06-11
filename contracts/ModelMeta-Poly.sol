pragma solidity 0.6.0;

import "./BasicMetaTransaction.sol";

contract ModelMeta is BasicMetaTransaction {
    
    uint256 public space;
    uint256 public price = 1 ether;   // Temp for 1PB storage we charged 1 eth
    uint256 public totalAmount;

    address payable public Owner;
    
    constructor () public { 
        Owner = payable(msgSender()); 
    }

    function diskSpace(uint _space) public  {
        space = _space;
        totalAmount = this.calCost();
        this.payment();
    }

    function getPrice() public view returns(uint256){
        return price;
    }

    function calCost() external returns(uint256){
        totalAmount = space*price;
        return totalAmount;
    }

    function payment() external payable {
        // address user = msg.sender;
        uint256 amount = this.calCost();
       
        require(msgSender().balance >= amount, "Account Balance is lower than total amount to be pay");
       
        (Owner).transfer(amount);
    }

    function checkContractBal() public view returns(uint256){
        return address(this).balance;
    }

    

}