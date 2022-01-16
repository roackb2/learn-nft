const hre = require("hardhat");

async function getAccounts() {
  return hre.ethers.provider.listAccounts();
}

async function listAccounts() {
  console.log(`accounts: ${accounts}`);
}

async function getBalance() {
  const accounts = await getAccounts();
  const balance = await hre.ethers.provider.getBalance(accounts[0])
  console.log(`balance: ${balance}`);
}

module.exports = {
  listAccounts,
  getBalance
}