// SPDX-License-Identifier: GPL-3.0-or-later
 pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Classis is ERC20, Ownable(msg.sender) {
    using SafeERC20 for ERC20;

    constructor()  ERC20('Classis', 'CLASS') {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);        
    }
    
} 
