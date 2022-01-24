// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import { Base64 } from "./libraries/Base64.sol";

contract MyEpicNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  string baseSvg = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

  string[] firstWords = ["Zeppelin", "Beast", "Kaiju"];
  string[] secondWords = ["Ruggling", "Shocking", "Fantastic"];
  string[] thirdWords = ["Artwork", "Bookkeper", "Pulsar"];

  constructor() ERC721 ("EpicNFT", "EPIC") {
    console.log("My Epic NFT");
  }

  event NewEpicNFTMinted (address sender, uint256 tokenId);

  function random(string memory input) internal pure returns (uint256) {
    return uint256(keccak256(abi.encodePacked(input)));
  }

  function pickWord(uint256 tokenId, string[] memory wordList, string memory key) public view returns (string memory) {
    uint256 rand = random(string(abi.encodePacked(key, Strings.toString(tokenId))));
    rand = rand % firstWords.length;
    return wordList[rand];
  }
  
  function assembleSentence(uint256 tokenId) private view returns (string memory) {
    return string(abi.encodePacked(
      pickWord(tokenId, firstWords, "FIRST_WORD"),
      pickWord(tokenId, secondWords, "SECOND_WORD"),
      pickWord(tokenId, thirdWords, "THIRD_WORD")
    ));
  }

  function assembleImage(string memory sentence) private view returns (string memory) {
    return string(abi.encodePacked(
      baseSvg,
      sentence,
      "</text></svg>"
    ));
  }

  function mint() public {
    uint256 newItemId = _tokenIds.current();
    _safeMint(msg.sender, newItemId);
    _setTokenURI(newItemId, "data:application/json;base64,ewogICJuYW1lIjogIkZpZW5uYSdzIGZpaXJzdCBzZWxmaWUiLAogICJkZXNjcmlwdGlvbiI6ICJGaWVubmEncyBzZWxmaWUgd2hlbiBjcm9zc2RyZXNzZWQgZmlyc3QgdGltZSIsIAogICJpbWFnZSI6ICJpcGZzOi8vUW1RMWMyUWNxZWlSbUpxRXdNMTdMYVpuTThTTG1KRVlFQUNueVBwaTd0ZVJOZSIsCiAgImV4dGVybmFsX3VybCI6ICJodHRwczovL3d3dy5pbnN0YWdyYW0uY29tL3AvQjF4MHBXbEhCUXgvIgp9");
    _tokenIds.increment();
    console.log("An NFT with ID %s has been minted to %s", newItemId, msg.sender);
  }

  function mintWords() public {
    uint256 newItemId = _tokenIds.current();
    string memory sentence = assembleSentence(newItemId);
    console.log("Sentence generated: %s", sentence);
    string memory svg = assembleImage(sentence);
    console.log("our image:", svg);
    string memory rawJson = string(abi.encodePacked(
      '{"name": "', sentence, '",',
      '"description": ', '"Randomly generated sentence",',
      '"image": "data:image/svg+xml;base64,', Base64.encode(bytes(svg)), '"}'
    ));
    console.log("generated JSON: %s", rawJson);
    string memory json = Base64.encode(bytes(rawJson));
    string memory tokenUri = string(abi.encodePacked("data:application/json;base64,", json));
    console.log("token URI: %s", tokenUri);
    _safeMint(msg.sender, newItemId);
    _setTokenURI(newItemId, tokenUri);
    _tokenIds.increment();
    console.log("An NFT of random words with ID  %s has been minted to %s", newItemId, msg.sender);
    emit NewEpicNFTMinted(msg.sender, newItemId);
  }

}