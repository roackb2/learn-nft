require('dotenv').config()
require('dotenv').config()
require('@nomiclabs/hardhat-ethers')
require("@nomiclabs/hardhat-web3")
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-etherscan");
const deploy = require('./scripts/deploy.js')
const {
  listAccounts,
  getBalance,
  mint
} = require('./scripts/actions')
const { task } = require('hardhat/config')
const {
  MAINNET_ALCHEMY_API_KEY,
  MAINNET_ACCOUNT_PRIVATE_KEY,
  RINKEBY_ALCHEMY_API_KEY,
  RINKEBY_ACCOUNT_PRIVATE_KEY,
  MATIC_ALCHEMY_API_KEY,
  MATIC_ACCOUNT_PRIVATE_KEY,
  MUMBAI_ALCHEMY_API_KEY,
  MUMBAI_ACCOUNT_PRIVATE_KEY,
  ETHERSCAN_API_KEY
} = process.env

task("deploy", "Deploy our Box contract").setAction(deploy)
task("list-accounts", "List all accounts").setAction(listAccounts)
task("get-balance", "Get balance in first account").setAction(getBalance)
task("mint", "Mint our Epic NFT").setAction(mint)

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${MAINNET_ALCHEMY_API_KEY}`,
      accounts: [MAINNET_ACCOUNT_PRIVATE_KEY]
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${RINKEBY_ALCHEMY_API_KEY}`,
      accounts: [RINKEBY_ACCOUNT_PRIVATE_KEY]
    },
    etherscan: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${MAINNET_ALCHEMY_API_KEY}`,
      apiKey: ETHERSCAN_API_KEY
    },
    matic: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${MATIC_ALCHEMY_API_KEY}`,
      accounts: [MATIC_ACCOUNT_PRIVATE_KEY]
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${MUMBAI_ALCHEMY_API_KEY}`,
      accounts: [MUMBAI_ACCOUNT_PRIVATE_KEY],
      gas: 2100000,
      gasPrice: 8000000000
    }
  }
};
