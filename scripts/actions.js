async function getContractAddress() {
  const network = await ethers.provider.getNetwork();
  switch (network.name) {
    case 'mainnet':
      return process.env.MAINNET_CONTRACT_ADDRESS
    case 'rinkeby':
      return process.env.RINKEBY_CONTRACT_ADDRESS
    case 'matic':
      return process.env.MATIC_CONTRACT_ADDRESS
    case 'maticmum': // the mumbai MATIC testnet
      return process.env.MUMBAI_CONTRACT_ADDRESS
    default:
      return process.env.CONTRACT_ADDRESS
  }
}

async function attachContract() {
  const address = await getContractAddress()
  const MyEpicNFT = await ethers.getContractFactory('MyEpicNFT')
  const contract = await MyEpicNFT.attach(address)
  return contract
}

async function getAccounts() {
  return ethers.provider.listAccounts();
}

async function listAccounts() {
  const accounts = await getAccounts();
  console.log(`accounts: ${accounts}`);
}

async function getBalance() {
  const accounts = await getAccounts();
  const balance = await ethers.provider.getBalance(accounts[0])
  console.log(`balance: ${balance}`);
}

async function mint() {
  const contract = await attachContract()
  const txn = await contract.mint()
  await txn.wait()
  console.log(`Item minted from contract ${txn.to}`)
}

async function mintWords() {
  const contract = await attachContract()
  const txn = await contract.mintWords()
  await txn.wait()
  console.log(`Item minted from contract ${txn.to}`)
}

module.exports = {
  listAccounts,
  getBalance,
  mint,
  mintWords
}