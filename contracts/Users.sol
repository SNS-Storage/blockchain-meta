// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "hardhat/console.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";



contract Users {
    
    address payable public Owner;
    uint256 freeSpace = 5000;    // By default assuming that 5PB size converted into GB 
    bool spaceCheck = false;

    using Counters for Counters.Counter;
    Counters.Counter private _countTotalUser;


    struct _Users{
        uint256 userId;
        address userAdd;
        uint256 totalSpace;
        uint256 userFreeSpace;
    }

    mapping(uint256 => _Users) users;


    constructor(){
        Owner = payable(msg.sender); 
    }

    modifier onlyOwner {
      require(msg.sender == Owner);
      _;
   }

    function paymentUser(address payable user, uint256 amount) external payable onlyOwner {
        amount*=1 ether;
        require(msg.sender.balance >= amount, "Account Balance is lower than total amount to be pay");
        payable(user).transfer(amount);
    }

    function checkSpace(uint256 fileSize) public view returns(bool){
        // require(freeSpace>=fileSize, "Not enough Space");
        if(freeSpace>=fileSize)
            return true;
        else return false;
    }

    function newuser(address _userAdd, uint256 _totalSpace) public {
        _countTotalUser.increment();
        uint countTotalUser = _countTotalUser.current();
        
        users[countTotalUser].userId = countTotalUser;
        users[countTotalUser].userAdd =  _userAdd;
        users[countTotalUser].totalSpace = _totalSpace;
        users[countTotalUser].userFreeSpace = _totalSpace;
    }

    function storeFile(uint256 _fileSize) public {
        if(checkSpace(_fileSize))
            freeSpace = freeSpace - _fileSize;
    }

    function getFreeSpace() public view returns(uint256){
        return freeSpace;
    }

    // function countFreeUser() public returns(uint256){
        
    //     Counters.Counter memory cntFreeUser;

    //     for(uint i=1; i<=_countTotalUser; i++){
    //         if(users[i].userFreeSpace > 0) {
    //             cntFreeUser.increment();
    //         }
    //     }

    //     return cntFreeUser.current();
    // }

    // function divideFile(uint256 _fileSize, 
    // )




}