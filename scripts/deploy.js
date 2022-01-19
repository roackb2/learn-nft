async function deploy() {
  const MyEpicNFT = await ethers.getContractFactory("MyEpicNFT");
  const contract = await MyEpicNFT.deploy();

  await contract.deployed();

  console.log("MyEpicNFT deployed to:", contract.address);
}

module.exports = deploy