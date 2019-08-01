pragma solidity ^0.5.0;

contract Marketplace {
    // state var
    string public name;

    // constructor: function run only one times when deploy
    constructor() public {
        name = "Decentralised Marketplace";
    }
}
