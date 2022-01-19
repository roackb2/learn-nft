// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract MyEpicNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  constructor() ERC721 ("EpicNFT", "EPIC") {
    console.log("My Epic NFT");
  }

  function mint() public {
    uint256 newItemId = _tokenIds.current();
    
    _safeMint(msg.sender, newItemId);

    _setTokenURI(newItemId, "data:application/json;base64,ewogICJuYW1lIjogIkZpZW5uYSdzIGZpaXJzdCBzZWxmaWUiLAogICJkZXNjcmlwdGlvbiI6ICJGaWVubmEncyBzZWxmaWUgd2hlbiBjcm9zc2RyZXNzZWQgZmlyc3QgdGltZSIsIAogICJpbWFnZSI6ICJpcGZzOi8vUW1RMWMyUWNxZWlSbUpxRXdNMTdMYVpuTThTTG1KRVlFQUNueVBwaTd0ZVJOZSIsCiAgImV4dGVybmFsX3VybCI6ICJodHRwczovL3d3dy5pbnN0YWdyYW0uY29tL3AvQjF4MHBXbEhCUXgvIgp9");

    _tokenIds.increment();

    console.log("An NFT with ID %s has been minted to %s", newItemId, msg.sender);
  }
}